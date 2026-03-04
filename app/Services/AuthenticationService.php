<?php

namespace App\Services;

use App\Interfaces\Services\AuthenticationServiceInterface;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthenticationService implements AuthenticationServiceInterface
{
    /**
     * Register a new user
     *
     * @param array $data
     * @return User
     */
    public function signup(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }

    /**
     * Authenticate a user with credentials
     *
     * @param array $credentials
     * @return bool
     */
    public function login(array $credentials): bool
    {
        if (Auth::attempt($credentials)) {
            // Regenerate session to invalidate old CSRF tokens
            // and prevent session fixation attacks
            session()->regenerate();
            return true;
        }
        return false;
    }

    /**
     * Logout the current user
     *
     * @return void
     */
    public function logout(): void
    {
        Auth::logout();
    }

    /**
     * Check if a user is authenticated
     *
     * @return bool
     */
    public function isAuthenticated(): bool
    {
        return Auth::check();
    }
}
