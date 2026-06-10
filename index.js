const fs = require('fs');
const path = require('path');
const docPath = "docs"

// Caminhos para a pasta que será lida e para o arquivo gerado
const pastaRascunhos = path.join(__dirname, docPath);
const arquivoSaida = path.join(__dirname, 'index.html');

// Lê o conteúdo da pasta Rascunhos
fs.readdir(pastaRascunhos, (err, arquivos) => {
    if (err) {
        return console.error('Erro ao ler a pasta Docs. Certifique-se de que ela existe.', err);
    }

    // Cria os links HTML para cada arquivo encontrado
    const links = arquivos.map(arquivo => {
        return `            <li>
                <a href="${docPath}/${arquivo}" target="_blank">📄 ${arquivo}</a>
            </li>`;
    }).join('\n');

    // Estrutura do HTML final
    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Índice de Rascunhos</title>
    <style>
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            background-color: #f9f9f9; 
            color: #333; 
            padding: 40px; 
            max-width: 800px; 
            margin: 0 auto; 
        }
        h1 { 
            border-bottom: 2px solid #0056b3; 
            padding-bottom: 10px; 
            color: #0056b3;
        }
        ul { 
            list-style-type: none; 
            padding: 0; 
        }
        li { 
            background: white; 
            margin: 8px 0; 
            padding: 15px; 
            border-radius: 8px; 
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            transition: transform 0.2s;
        }
        li:hover {
            transform: translateX(5px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        a { 
            text-decoration: none; 
            color: #333; 
            font-weight: 500; 
            display: block;
        }
        a:hover { 
            color: #0056b3; 
        }
    </style>
</head>
<body>
    <h1>📁 Meus Rascunhos</h1>
    <ul>
${links.length > 0 ? links : '            <li>Nenhum rascunho encontrado.</li>'}
    </ul>
</body>
</html>`;

    // Salva o arquivo index.html na raiz
    fs.writeFile(arquivoSaida, html, (err) => {
        if (err) {
            return console.error('Erro ao salvar o arquivo HTML:', err);
        }
        console.log('✅ Arquivo index.html gerado com sucesso!');
    });
});
