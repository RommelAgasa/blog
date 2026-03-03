<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Services\AuthenticationService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * The authentication service instance
     *
     * @var AuthenticationService
     */
    protected AuthenticationService $authService;

    /**
     * Create a new controller instance
     *
     * @param AuthenticationService $authService
     */
    public function __construct(AuthenticationService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Handle user signup request
     *
     * @param StoreUserRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function signup(StoreUserRequest $request)
    {
        $user = $this->authService->signup($request->validated());

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
        ], 201);
    }

    /**
     * Handle user login request
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($this->authService->login($credentials)) {
            return response()->json([
                'message' => 'User logged in successfully',
            ], 200);
        }

        return response()->json([
            'message' => 'Invalid credentials',
        ], 401);
    }

    /**
     * Handle user logout request
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        $this->authService->logout();

        return response()->json([
            'message' => 'User logged out successfully',
        ], 200);
    }

    /**
     * Get the authenticated user
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function user(Request $request)
    {
        if ($this->authService->isAuthenticated()) {
            return response()->json([
                'user' => $request->user(),
            ], 200);
        }

        return response()->json([
            'message' => 'Unauthenticated',
        ], 401);
    }
}
