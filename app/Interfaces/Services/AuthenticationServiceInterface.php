<?php

namespace App\Interfaces\Services;

interface AuthenticationServiceInterface
{
    /**
     * Register a new user
     *
     * @param array $data
     * @return mixed
     */
    public function signup(array $data);

    /**
     * Authenticate a user with credentials
     *
     * @param array $credentials
     * @return bool
     */
    public function login(array $credentials): bool;

    /**
     * Logout the current user
     *
     * @return void
     */
    public function logout(): void;

    /**
     * Check if a user is authenticated
     *
     * @return bool
     */
    public function isAuthenticated(): bool;
}
