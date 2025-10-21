🧠 Projeto: Site Interativo de Cadastro "Desnecessário"

> Um site experimental e interativo que simula um processo de cadastro **completamente inútil**, mas extremamente divertido e criativo.

---

 💡 Sobre o Projeto

Este projeto é um site interativo em múltiplas etapas (stages) que conduz o usuário por uma série de telas, perguntas e formulários aparentemente sérios — mas que, no final, **não servem para absolutamente nada**.  
O objetivo é brincar com a ideia de cadastros longos e questionários absurdos, usando humor e UX criativa.

---

⚙️ Estrutura de Funcionamento

O site é dividido em vários stages, cada um representando uma parte do “cadastro”:

| Stage | Descrição |
|--------|------------|
| 1-17 | Etapas iniciais com informações básicas e perguntas aleatórias |
| 18 | Seleção de idioma (em chinês 🇨🇳, porque sim) |
| 19 | Teste de verificação de humano com 20 perguntas absurdas |
| 20 | (Opcional / em desenvolvimento) – Resumo das informações coletadas |
| 21 | Tela final: “Cadastro concluído! Nenhuma informação foi salva.” |

Cada stage é exibido e ocultado dinamicamente através da função global `showStage(n)`, que garante a transição fluida entre etapas.

---

🔩 Tecnologias Utilizadas

- **HTML5** – Estrutura das etapas (stages)
- **CSS3 (Responsivo)** – Layout moderno e adaptável, com foco em experiência divertida
- **JavaScript (Vanilla)** – Controle total da lógica de transição, eventos e verificações

---

 🧩 Funcionalidades Principais

- ✅ Navegação dinâmica entre estágios (`showStage()`)
- ✅ Sistema de validação interativa e “inteligente”
- ✅ Simulação de perguntas absurdas (ex: “Você consegue imaginar uma cor que nunca viu?”)
- ✅ Resumo final de todas as respostas (sem salvar nada!)
- ✅ Botão de **reinício total do site** (`location.reload()`)

---

 🧠 Filosofia do Projeto

> “Nem tudo que parece sério precisa ter um propósito real.”

O site foi feito para **experimentar interações**, **animar o usuário** e demonstrar **domínio de manipulação DOM, lógica condicional e transições entre telas**.

---

🚀 Futuras Melhorias

 Adicionar pequenas animações entre stages

 Implementar sistema de “pontuação de sanidade” baseado nas respostas 😵

 Adicionar um modo “dark humor”

 Criar uma versão multiplayer (porque rir junto é melhor)

🧑‍💻 Autor

Gabriel Moraes
Desenvolvedor e criador do projeto.
Apaixonado por tecnologia, humor e experiências interativas que não fazem o menor sentido, mas divertem muito.

📧 Contato: [gabrielmoraesdev@outlook.com]
🐙 GitHub: https://github.com/bielmoraes7

⭐ Se você riu ou achou genialmente inútil, deixe uma estrela no repositório!
