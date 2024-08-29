<?php

namespace App\Fieldtypes;

use Statamic\Fields\Fieldtype;

class LayoutPreview extends Fieldtype
{
    /**
     * The blank/default value.
     *
     * @return array
     */

    protected $icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="scale(.66667)"><rect width="22" height="22" x=".5" y=".497" rx="1" ry="1"></rect><path d="M.5 6.497h22m-15 0v16m0-8h15"></path></g></svg>';

    public function defaultValue()
    {
        return null;
    }

    /**
     * Pre-process the data before it gets sent to the publish page.
     *
     * @param mixed $data
     * @return array|mixed
     */
    public function preProcess($data)
    {
        return $data;
    }

    /**
     * Process the data before it gets saved.
     *
     * @param mixed $data
     * @return array|mixed
     */
    public function process($data)
    {
        return $data;
    }

    protected function configFieldItems(): array
    {
        return [
            'preview_text' => [
                'display' => 'Preview Text',
                'instructions' => 'Choose a text to display',
                'type' => 'text',
            ],
            'preview_images' => [
                'display' => 'Preview Images',
                'instructions' => 'Choose which images you want to use',
                'type' => 'assets',
                'max_files' => 1 
            ],
        ];
    }
}
