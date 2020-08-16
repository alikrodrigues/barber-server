import Knex from 'knex';

export async function seed(knex: Knex) {
    const options = [
        {
          name: 'Corte de cabelo',
          picture: 'https://picture.freepik.com/fotos-gratis/barbeiro-corte-cabelo-pescoco-cliente_23-2147778922.jpg',
          price: 38,
          type_id: 2,
          time: 30
        },
        {
          name: 'Barba',
          picture: 'https://szstudio.com.br/wp-content/uploads/2019/06/sz-studio-os-beneficios-de-fazer-a-barba-na-barbearia.jpg',
          price: 30,
          type_id: 2,
          time: 30
        },
        {
          name: 'Acabamento Cabelo',
          picture: 'https://picture.freepik.com/fotos-gratis/close-up-de-cabeleireiras-maos-luvas_23-2148257049.jpg',
          price: 20,
          type_id: 2,
          time: 30
        },
        {
          name: 'Sobrancelhas',
          price: 15,
          type_id: 2,
          time: 30
        },
        {
          name: 'Acabamento barba',
          picture: 'https://picture.freepik.com/fotos-gratis/barbear-uma-barba-em-uma-barbearia-com-uma-navalha-perigosa_100894-290.jpg',
          price: 20,
          type_id: 2,
          time: 30
        },
        {
          name: 'Cera nariz/orelha',
          price: 15,
          type_id: 2,
          time: 30
        },
        {
          name: 'Platinado',
          price: 80,
          type_id: 2,
          time: 30
        },
        {
          name: 'Camuflagem de cabelo',
          price: 60,
          type_id: 2,
          time: 30
        },
        {
          name: 'Selagem',
          price: 60,
          type_id: 2,
          time: 30
        },
        {
          name: 'Cabelo infantil',
          price: 33,
          type_id: 2,
          time: 30
        },
        {
          name: 'Limpeza de pele carvão',
          price: 40,
          type_id: 2,
          time: 30
        },
        {
          name: 'Coloração barba',
          picture:
            'https://ogimg.infoglobo.com.br/in/21860712-8cb-e29/FT1086A/652/INFOCHPDPICT000071450666.jpg',
          price: 30,
          type_id: 2,
          time: 30
        },
        {
          name: 'Hidratação Joico',
          price: 40,
          type_id: 2,
          time: 30
        },
        {
          name: 'Cone Hindu',
          price: 55,
          type_id: 2,
          time: 30
        },
      ];
    await  knex('item').insert(options);
}