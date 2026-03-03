<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-8">
        <div class="max-w-xl w-full">
            <form class="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <!-- Header -->
                <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-transparent">
                    <div class="flex items-center gap-2">
                        <div class="p-2 bg-indigo-100 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h1 class="text-lg font-bold text-gray-900">Welcome Back</h1>
                    </div>  
                </div>

                <!-- Form Content -->
                <div class="p-6 space-y-5">
                    <p class="text-gray-500 text-sm">Please sign in to continue</p>

                    <!-- Name Field -->
                    <div class="space-y-2">
                        <label for="name" class="block text-sm font-semibold text-gray-900">
                            Name
                            <span class="text-red-500">*</span>
                        </label>
                        <div class="flex items-center px-4 py-2.5 border border-gray-300 rounded-lg focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all duration-200 hover:border-gray-400">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-gray-400">
                                <path 
                                    d="M12 12c2.761 0 5-2.239 5-5S14.761 2 12 2 7 4.239 7 7s2.239 5 5 5zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" 
                                    fill="currentColor"/>
                            </svg>
                            <input type="text" id="name" placeholder="Your name" class="ml-3 bg-transparent text-gray-900 placeholder-gray-400 outline-none text-sm w-full" required>                 
                        </div>
                    </div>

                    <!-- Email Field -->
                    <div class="space-y-2">
                        <label for="email" class="block text-sm font-semibold text-gray-900">
                            Email
                            <span class="text-red-500">*</span>
                        </label>
                        <div class="flex items-center px-4 py-2.5 border border-gray-300 rounded-lg focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all duration-200 hover:border-gray-400">
                            <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-gray-400">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="currentColor"/>
                            </svg>
                            <input type="email" id="email" placeholder="your.email@example.com" class="ml-3 bg-transparent text-gray-900 placeholder-gray-400 outline-none text-sm w-full" required>                 
                        </div>
                    </div>

                    <!-- Password Field -->
                    <div class="space-y-2">
                        <label for="password" class="block text-sm font-semibold text-gray-900">
                            Password
                            <span class="text-red-500">*</span>
                        </label>
                        <div class="flex items-center px-4 py-2.5 border border-gray-300 rounded-lg focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all duration-200 hover:border-gray-400">
                            <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-gray-400">
                                <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="currentColor"/>
                            </svg>
                            <input type="password" id="password" placeholder="Enter your password" class="ml-3 bg-transparent text-gray-900 placeholder-gray-400 outline-none text-sm w-full" required>                 
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <button type="submit" class="w-full py-2.5 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 font-semibold hover:shadow-lg">
                        Login
                    </button>
                </div>

                <!-- Footer -->
                <div class="px-6 py-4 border-t border-gray-200 bg-gray-50/50 text-center">
                    <p class="text-gray-500 text-sm">Don't have an account? <Link href="/signup" class="text-indigo-600 hover:text-indigo-700 font-semibold">Sign up</Link></p>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3'
</script>
