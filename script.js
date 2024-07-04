const form = document.querySelector('#registration .formulario');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const nomeInput = form.querySelector('input[name="nome"]').value.trim();
    const emailInput = form.querySelector('input[name="email"]').value.trim();
    const telefoneInput = form.querySelector('input[name="telefone"]').value.trim();

    if (nomeInput === '' || emailInput === '' || telefoneInput === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const formData = {
        nome: nomeInput,
        email: emailInput,
        telefone: telefoneInput
    };

    fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_SENDGRID_API_KEY'
        },
        body: JSON.stringify({
            personalizations: [{
                to: [{
                    email: emailInput,
                }],
                subject: 'Confirmação de Registro na LEARN ACADEMY',
            }],
            from: {
                email: 'contato@learnacademy.com',
                name: 'LEARN ACADEMY'
            },
            content: [{
                type: 'text/plain',
                value: `Olá ${nomeInput},\n\nObrigado por se registrar na LEARN ACADEMY. Entraremos em contato em breve.\n\nAtenciosamente,\nEquipe LEARN ACADEMY`
            }]
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao enviar e-mail.');
        }
        return response.json();
    })
    .then(data => {
        alert('Registro realizado com sucesso! Verifique seu e-mail para confirmação.');
        form.reset();
    })
    .catch(error => {
        console.error('Erro ao enviar e-mail:', error);
        alert('Ocorreu um erro ao enviar o registro. Por favor, tente novamente mais tarde.');
    });
});
