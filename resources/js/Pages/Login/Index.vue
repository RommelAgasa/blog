<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
        <form class="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
            <h1 class="text-gray-900 text-3xl mt-10 font-medium">Login</h1>
            <p class="text-gray-500 text-sm mt-2">Please sign in to continue</p>

            <div class="flex items-center w-full mt-10 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                        d="M12 12c2.761 0 5-2.239 5-5S14.761 2 12 2 7 4.239 7 7s2.239 5 5 5zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" 
                        fill="#6B7280"/>
                </svg>
                <input type="text" placeholder="Name" class="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full" required>                 
            </div>

            <div class="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#6B7280"/>
                </svg>
                <input type="email" placeholder="Email" class="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full" required>                 
            </div>

            <div class="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#6B7280"/>
                </svg>
                <input type="password" placeholder="Password" class="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full" required>                 
            </div>

            <button type="submit" class="mt-2 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity">
                Login
            </button>
            <p class="text-gray-500 text-sm mt-3 mb-11">Don’t have an account? <a class="text-indigo-500" href="#">Sign up</a></p>
        </form>
    </div>
</template>

<script>

</script>
