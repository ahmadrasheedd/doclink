<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class TrustNgrok
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
        if (App::environment('local') && $request->server->has('HTTP_X_ORIGINAL_HOST')) {
            $request->server->set('HTTPS', 'on');
        }

        return $next($request);
    }
}
