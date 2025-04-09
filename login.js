document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.querySelector('#password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }
    
    // Form submission
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('remember').checked;
            
            // Simple validation
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            // Add loading animation to button
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
            submitBtn.disabled = true;
            
            // Simulate API call with timeout
            setTimeout(() => {
                // For demo purposes - in a real app, you would validate with a server
                if (email && password) {
                    // Store login state if "Remember me" is checked
                    if (rememberMe) {
                        localStorage.setItem('rememberMe', 'true');
                        localStorage.setItem('email', email);
                    }
                    
                    // Success animation
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Login Successful!';
                    submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #2E7D32)';
                    
                    // REDIRECT TO HOMEPAGE AFTER 1 SECOND
                    setTimeout(() => {
                        window.location.href = 'homepage.html';
                    }, 1000);
                } else {
                    // Error animation
                    submitBtn.innerHTML = '<i class="fas fa-times"></i> Invalid Credentials';
                    submitBtn.style.background = 'linear-gradient(135deg, #f44336, #d32f2f)';
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = 'Login';
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 1500);
                }
            }, 1500);
        });
    }
    
    // Check if "Remember me" was checked previously
    if (localStorage.getItem('rememberMe') === 'true') {
        const savedEmail = localStorage.getItem('email');
        if (savedEmail) {
            document.getElementById('email').value = savedEmail;
            document.getElementById('remember').checked = true;
        }
    }
    
    // Input focus effects
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('input-focus');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('input-focus');
        });
    });
    
    // Social login buttons animation
    const socialBtns = document.querySelectorAll('.social-btn');
    
    socialBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
            
            setTimeout(() => {
                this.innerHTML = this.classList.contains('google') ? 
                    '<i class="fab fa-google"></i> <span>Continue with Google</span>' : 
                    '<i class="fab fa-facebook-f"></i> <span>Continue with Facebook</span>';
                // Redirect to home after social login
                window.location.href = 'homepage.html';
            }, 2000);
        });
    });
});