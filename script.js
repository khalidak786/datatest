// script.js
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = supabase.createClient(supabaseUrl, supabaseAnonKey);

document.getElementById('signup-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const errorMessageDiv = document.getElementById('error-message');
    const successMessageDiv = document.getElementById('success-message');

    errorMessageDiv.textContent = ''; // Clear previous errors
    successMessageDiv.textContent = ''; //Clear previous successes.

    if (password !== confirmPassword) {
        errorMessageDiv.textContent = "Passwords do not match.";
        return;
    }

    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    username: username, //add username to user metadata.
                },
            },
        });

        if (error) {
            errorMessageDiv.textContent = error.message;

        } else {

            successMessageDiv.textContent = "Signup successful! Please check your email to confirm your account.";

            // Optionally, redirect the user or clear the form.
            document.getElementById('signup-form').reset();
        }
    } catch (error) {
        errorMessageDiv.textContent = "An unexpected error occurred.";
        console.error("Supabase error:", error);
    }
});
