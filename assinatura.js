import { generateKeyPairSync, createSign, createVerify } from 'crypto';

const { privateKey, publicKey } = generateKeyPairSync('rsa',
    {
        modulusLength: 2048,

        publicKeyEncoding: {
            type: 'spki',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
        },
    }
);

let dados = "Essa string será assinada"

// Assinatura

// createSign: Cria um objeto para assinatura digital.
const documento = createSign('rsa-sha256');
// Atualiza o objeto de assinatura com os dados a serem assinados.
documento.update(dados);
// Assina os dados usando a chave privada, retornando a assinatura no formato hexadecimal.
const assinatura = documento.sign(privateKey, 'hex');

console.log(`Assinatura: ${assinatura}`)

// Intermediário
// dados += ' Arquivo alterado'

// Envio
// createVerify: Cria um objeto para verificação de assinaturas digitais.
const verificador = createVerify('rsa-sha256')
// Atualiza o objeto de verificação com os dados assinados.
verificador.update(dados);
// Verifica a assinatura usando a chave pública.
const ehVerificado = verificador.verify(publicKey, assinatura, 'hex');

console.log(ehVerificado)