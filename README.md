# 🚨 Nuclear Sentinel (Projeto Sentinela)

Aplicação mobile desenvolvida em **React Native**, com **Expo** e
**TypeScript**, para o gerenciamento, monitoramento e resposta a
ocorrências de segurança em ambientes nucleares. Este projeto é um
estudo de caso voltado ao setor de contenção e operações da AMAZUL.

---

## 🛠️ Tecnologias Utilizadas

- **React Native** e **Expo** --- framework e ambiente de
  desenvolvimento mobile.
- **TypeScript** --- superset de JavaScript com tipagem estática.
- **React Navigation** --- gerenciamento de rotas e navegação da
  aplicação.
- **AsyncStorage** --- `@react-native-async-storage/async-storage`,
  utilizado para persistência local de dados e sessões.
- **React Native Safe Area Context** --- gerenciamento das áreas
  seguras em diferentes dispositivos.

---

## 📂 Arquitetura do Projeto

O código está estruturado de forma modular e desacoplada, separando a
lógica de negócio dos estilos visuais:

```text
nuclear-sentinel/
├── src/
│   ├── components/       # Componentes reutilizáveis (Button, Card, Header, Input, Loading, Modal)
│   ├── data/             # Dados iniciais mockados (utilizadores e ocorrências padrão)
│   ├── navigation/       # Configuração das rotas e navegação da aplicação
│   ├── screens/          # Ecrãs principais (Login, Listagem, Criação e Detalhes)
│   ├── services/         # Camada de persistência e serviços (AsyncStorage e autenticação)
│   ├── styles/           # Folhas de estilo centralizadas e modulares (.styles.ts)
│   ├── types/            # Definições de tipos e interfaces TypeScript
│   └── utils/            # Funções utilitárias e regras de permissão (RBAC)
├── App.tsx               # Ponto de entrada da aplicação
└── app.json              # Configurações do Expo
```

---

## 👥 Contas de Teste (Credenciais de Acesso)

A aplicação possui dois perfis distintos, com permissões controladas:
**Operador** e **Supervisor**.

- Perfil: Operador
  - E-mail de acesso : operador@amazul.com
  - Senha: operador123
  - Permissões no sistema: Visualizar ocorrências e registrar novas ocorrências

- Perfil: Supervisor
  - E-mail de acesso : supervisor@amazul.com
  - Senha: supervisor123
  - Permissões no sistema: Visualizar e registrar ocorrências, além de alterar o status de qualquer ocorrência (Pendente, Em Processo ou Resolvida).

---

> **Nota:** As credenciais são destinadas exclusivamente ao ambiente
> demonstrativo do MVP.

---

## 🚀 Instruções de Execução

### Pré-requisitos

Certifique-se de ter instalado na sua máquina:

- **Node.js** --- versão 18 ou superior recomendada.
- **npm** ou **Yarn**.
- Aplicativo **Expo Go** instalado no celular, disponível na App
  Store ou Google Play.

### Passo a passo

1.  **Clonar o repositório** ou descompactar a pasta do projeto.

    ````bash
    git clone https://github.com/ChristianRDiaz/nuclear-sentinel.git

2.  **Aceder à pasta do projeto:**

    ``` bash
    cd nuclear-sentinel
    ```

3.  **Instalar as dependências:**

    ``` bash
    npm install
    ```

4.  **Iniciar o projeto com o Expo:**

    ``` bash
    npx expo start
    ```

5.  **Abrir a aplicação no telemóvel:**

    -   Abra o Expo Go.
    -   Leia o QR Code apresentado no terminal ou na página aberta pelo
        Expo.
    -   Aguarde o carregamento da aplicação.

------------------------------------------------------------------------

## 🌐 Informações Importantes sobre Rede e Conexão (Expo Go)

Para executar o projeto no celular utilizando o **Expo Go**, tenha em
atenção os seguintes cenários de rede:

### 1. Conexão Wi-Fi local (padrão)

O computador onde o projeto está a ser executado e o celular devem
estar conectados à **mesma rede Wi-Fi**. Nessa condição, a leitura do QR
Code gerado pelo Expo deverá permitir a conexão local.

### 2. Autenticação no Expo (conta)

Se o Expo solicitar autenticação ou ocorrer alguma restrição de sessão
no terminal, poderá ser necessário iniciar sessão numa conta Expo:

``` bash
npx expo login
````

Também é possível criar uma conta gratuita no site oficial do Expo. Um
**Access Token** só será necessário quando o fluxo ou serviço utilizado
o exigir; para iniciar o servidor local com `npx expo start`,
normalmente não é obrigatório.

> **Como executar utilizando o Access Token:**
> 
> Primeiro, defina a variável de ambiente no seu terminal (PowerShell) para autenticar a sua conta:
> ```powershell
> $env:EXPO_TOKEN="O_SEU_TOKEN_GERADO"
> ```
> 
> Logo em seguida, na mesma janela do terminal, execute o comando do Expo para iniciar o projeto:
> ```powershell
> npx expo start
> ```

### 3. Redes corporativas ou universitárias com firewall (modo túnel)

Em redes de faculdades ou empresas, firewalls podem bloquear portas
utilizadas pelo Metro Bundler. Se a conexão direta por Wi-Fi falhar,
tente iniciar o projeto em **modo túnel**:

```bash
npx expo start --tunnel
```

O modo túnel permite conectar celular ao projeto mesmo quando
computador e celular estão em redes diferentes ou há restrições na
rede local. O carregamento inicial pode ser um pouco mais lento.

---

## ⚠️ Observação

O Nuclear Sentinel é um MVP académico com dados e ocorrências simulados.
Não deve ser utilizado para monitoramento operacional, avaliação de
riscos ou tomada de decisões de segurança em instalações nucleares
reais.
