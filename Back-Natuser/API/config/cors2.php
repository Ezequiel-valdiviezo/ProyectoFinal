<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Laravel CORS
    |--------------------------------------------------------------------------
    |
    | allowedOrigins, allowedHeaders and allowedMethods can be set to ['*']
    | to accept any value.
    |
    */

    'paths' => ['api/*'],

    'allowed_origins' => ['http://localhost:5173'], // Cambia esto por tu origen de frontend

    'allowed_methods' => ['*'],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,
];
