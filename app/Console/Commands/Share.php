<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Process;
use Symfony\Component\Console\Command\SignalableCommandInterface;
use Symfony\Component\Yaml\Yaml;

class Share extends Command implements SignalableCommandInterface
{
    protected $signature = 'share';

    protected $description = 'Expose local to web with ngrok';

    protected string $ngrokConfigPath;
    protected array $ngrokConfig;
    protected bool $ngrokIsRunning = false;
    protected bool $shouldExit = false;

    public function handle()
    {
        $this->ngrokConfigPath = base_path('ngrok.yaml');

        if(!file_exists($this->ngrokConfigPath)) {
            throw new \Exception("Config not found. Looked for: $this->ngrokConfigPath");
        }

        $stopNgrok = $this->startNgrok();
        $stopShareFile = $this->touchShareFile();

        $this->line('');
        $this->line('Press ctrl+c to stop');

        $this->waitingLoop();
        
        $stopShareFile();
        $stopNgrok();
    }

    public function startNgrok()
    {
        $ngrok = Process::start("ngrok start --all --config=$this->ngrokConfigPath");
        
        if($ngrok && $ngrok->running() == true) {
            $this->ngrokConfig = Yaml::parseFile($this->ngrokConfigPath);
            
            $this->line('----------------------------');
            $this->info('Status:              online');
            $this->line('Forwarding:          https://'.Arr::get($this->ngrokConfig, 'tunnels.site.hostname').' --> '.Arr::get($this->ngrokConfig, 'tunnels.site.request_header.add.0'));
            $this->warn('Infos:               If would like to dev and test on mobile, don\'t forget to run: vite build -w');
        }

        return function () use ($ngrok) {
            if($ngrok->running()) {
                $ngrok->signal(SIGINT);
            }
        };
    }

    public function touchShareFile()
    {
        file_put_contents(
            storage_path('sharefile'),
            Arr::get($this->ngrokConfig, 'tunnels.site.hostname')
        );

        return function () {
            @unlink(storage_path('sharefile'));
        };
    }

    public function waitingLoop ()
    {
        while(true) {

            if($this->shouldExit) {
                break;
            }
            
            sleep(10);
        }
    }

    public function getSubscribedSignals(): array
    {
        return [SIGINT, SIGTERM];
    }

    public function handleSignal(int $signal, int|false $previousExitCode = 0): int|false
    {

        $this->shouldExit = true;

        return false;   
    }
    
}
