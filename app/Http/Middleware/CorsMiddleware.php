<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Set CORS headers for all requests
        $headers = [
            'Access-Control-Allow-Origin' => '*',
           
            'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers' => 'Access-Control-Request-Headers,Access-Control-Request-Method, Access-Control-Allow-Headers, Origin,Accept, Content-Type, Authorization, X-Requested-With',
            'ngrok-skip-browser-warning' => 'true',
        ];

        // Handle OPTIONS request for preflight
        if ($request->getMethod() === 'OPTIONS') {
            return response()->json('OK', 200, $headers);
        }

        // Handle actual request and add CORS headers to the response
        $response = $next($request);

        foreach ($headers as $key => $value) {
            $response->headers->set($key, $value);
        }

        return $response;
    }
}
