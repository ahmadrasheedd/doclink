<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Laravel CORS Options
    |--------------------------------------------------------------------------
    |
    | The options defined here are the defaults used by the CORS middleware.
    | You can publish this file using the `vendor:publish` command.
    |
    */

    'paths' => ['api/*', 'signin', 'signup'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['http://localhost:3000'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

];
