<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\URL;

class ShareServiceProvider extends ServiceProvider
{
    
    public function register(): void
    {
        
    }

    public function boot(): void
    {   
        if(!file_exists(storage_path('sharefile'))) {
            return;
        }

        $url = 'https://'. file_get_contents(storage_path('sharefile'));

        Config::set([
            'app.url' => $url,
            'app.asset_path' => '/'
        ]);

        URL::forceRootUrl($url);
        URL::forceScheme('https');
    }
}