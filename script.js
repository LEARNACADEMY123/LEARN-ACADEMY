$(document).ready(function() {
    // Validação do formulário
    $('#submitForm').click(function(event) {
        event.preventDefault(); // Evita o comportamento padrão do link

        // Validação dos campos
        let nome = $('#nome').val().trim();
        let email = $('#email').val().trim();
        let telefone = $('#telefone').val().trim();
        let isValid = true;

        // Validação do campo nome
        if (nome === '') {
            $('#nomeError').text('Digite seu nome.');
            isValid = false;
        } else {
            $('#nomeError').text('');
        }

        // Validação do campo email
        if (email === '') {
            $('#emailError').text('Digite seu email.');
            isValid = false;
        } else if (!validateEmail(email)) {
            $('#emailError').text('Digite um email válido.');
            isValid = false;
        } else {
            $('#emailError').text('');
        }

        // Validação do campo telefone
        if (telefone === '') {
            $('#telefoneError').text('Digite seu telefone.');
            isValid = false;
        } else {
            $('#telefoneError').text('');
        }

        // Se todos os campos forem válidos, submeter o formulário
        if (isValid) {
            sendData(nome, email, telefone);
        }
    });

    function validateEmail(email) {
        // Regex para validação simples de email
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function sendData(nome, email, telefone) {
        // Configuração dos dados para enviar
        let formData = {
            nome: nome,
            email: email,
            telefone: telefone
        };

        // Envio dos dados usando fetch API para a API do GitHub
        $.ajax({
            url: 'https://api.github.com/repos/LEARNACADEMY123/LEARN-ACADEMY/issues',
            type: 'POST',
            headers: {
                'Authorization': '',
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                title: `New User: ${nome}`,
                body: `**Email:** ${email}\n**Telefone:** ${telefone}`,
            }),
            success: function(data) {
                if (data.id) {
                    alert('Cadastro realizado com sucesso!');
                } else {
                    alert('Erro ao realizar cadastro. Tente novamente.');
                }
            },
            error: function(error) {
                console.error('Erro:', error);
                alert('Erro ao realizar cadastro. Tente novamente.');
            }
        });
    }

    // Scroll suave para âncoras
    $('a[href^="#"]').on('click', function(event) {
        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function() {
            window.location.hash = target;
        });
    });
});
