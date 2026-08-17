const usuarios = [
    {
        usuario: "danielpessoni",
        seletorImagem: ".coluna-autor .avatar",
        seletorNome: ".coluna-autor .nome"
    },
    {
        usuario: "devemdobro",
        seletorImagem: ".coluna-mentores .avatar",
        seletorNome: ".coluna-mentores .nome"
    }
];


async function carregarUsuarioGitHub(usuario) {
    const resposta = await fetch(`https://api.github.com/users/${usuario}`);

    if (!resposta.ok) {
        throw new Error(`Não foi possível carregar o usuário ${usuario}.`);
    }

    return await resposta.json();
}


async function atualizarPerfilGitHub(perfil) {
    try {
        const usuario = await carregarUsuarioGitHub(perfil.usuario);

        const imagem = document.querySelector(perfil.seletorImagem);
        const nome = document.querySelector(perfil.seletorNome);

        if (imagem) {
            imagem.src = usuario.avatar_url;
            imagem.alt = `Foto de perfil de ${usuario.name || usuario.login}`;
        }

        if (nome) {
            nome.textContent = usuario.name || usuario.login;
        }

    } catch (erro) {
        console.error(erro);
    }
}


usuarios.forEach(atualizarPerfilGitHub);