import { createHash } from 'crypto'

function criarHash(senha) {
    // Algorítimo de hash SHA256
    return createHash('sha256').update(senha).digest('hex')
}

console.log(criarHash("minha Senha"))

class Usuario {
    constructor(nome, senha) {
        this.nome = nome;
        this.hash = criarHash(senha);
    }

    autentica(nome, senha) {
        if (nome === this.nome && this.hash === criarHash(senha)) {
            console.log("Usuário autenticado com sucesso!")
            return true;
        }

        console.log("Usuário ou senha incorretos");
        return false;
    }
}

const usuario = new Usuario('joao carlos', 'minhaSenha');
console.log(usuario)

// Caso de sucesso
usuario.autentica('joao carlos', 'minhaSenha')

// Caso de erro
usuario.autentica('joao carlos', 'minhasenha')