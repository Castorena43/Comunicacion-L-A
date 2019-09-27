<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function toDo(Request $request){
        $tokena = $request->user()->token_api;
        //$usuarios = response()->json(\App\User::all());
        $client = new \GuzzleHttp\Client(['base_uri' => 'http://127.0.0.1:3333/']);
        $response = $client->post('http://127.0.0.1:3333/consumir',
        [
            'headers' => [
                "Authorization"=> "Bearer ".$tokena
            ]
        ]);
        return $response->getBody();
    }

    public function logout(Request $request){
        $tokena = $request->user()->token_api;
        $request->user()->forceFill([
            'api_token' => null,
            'token_api' => null
        ])->save();
        $body = [
            "email"=>$request->email,
            "password"=>$request->password,
        ];
        $client = new \GuzzleHttp\Client(['base_uri' => 'http://127.0.0.1:3333/']);
        $response = $client->post('http://127.0.0.1:3333/cerrar',
        [
            'headers' => [
                "Authorization"=> "Bearer ".$tokena
            ],
            'form_params' => $body
        ]);
        return $response->getBody();
        //\abort(204);
    }

    public function login(Request $request)
    {
        $credenciales = ["email"=>$request->email,"password"=>$request->password];
        if(Auth::once($credenciales)){
            $token = Str::random(60);
            $request->user()->forceFill([
                'api_token' => hash('sha256', $token),
            ])->save();
            $body = [
                "email"=>$request->email,
                "password"=>$request->password,
            ];
            $client = new \GuzzleHttp\Client(['base_uri' => 'http://127.0.0.1:3333/']);
            $response = $client->post('http://127.0.0.1:3333/iniciar',
            [
                'headers' => ['foo' => 'bar'],
                'form_params' => $body
            ]);
            $token_adonis = $response->getBody();
            $request->user()->forceFill([
                'token_api' => $token_adonis,
            ])->save();
            return $token;
        }
        \abort(401);
    }

    public function registro(Request $request){
        $user = new \App\User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        if($user->save())
            $body = [
                "username" => $request->name,
                "email"=>$request->email,
                "password"=>$request->password
            ];
            $client = new \GuzzleHttp\Client(['base_uri' => 'http://127.0.0.1:3333/']);
            $response = $client->post('http://127.0.0.1:3333/registrar',
            [
                'headers' => ['foo' => 'bar'],
                'form_params' => $body
            ]);
            return $response->getBody();
        return response()->json(null,204);
    }
    public function prueba(Request $request){
        $body = ["email"=>$request->email,"password"=>$request->password];
        $client = new \GuzzleHttp\Client(['base_uri' => 'http://127.0.0.1:3333/']);
        $response = $client->post('http://127.0.0.1:3333/prueba',
        [
            'headers' => ['foo' => 'bar'],
            'form_params' => $body
        ]);
        return $response->getBody();
    }
}
