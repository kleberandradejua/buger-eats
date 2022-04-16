var faker = require('faker');
var cpf = require('gerador-validador-cpf');

export default{
    deliver: function(){
        var firstName = faker.name.firstName();
        var lastName = faker.name.lastName();
        

        var data = {
            name: `${firstName} ${lastName}`, 
            cpf: cpf.generate(),
            email: faker.internet.email(firstName),
            whatsapp: "88981247728",
            address: {
                postalcode: "63016130",
                street: "Rua Marechal Mascarenhas de Morais",
                district: "Juvencio Santana",
                city_state: "Juazeiro do Norte/CE",
                number: "37"
    
            },
            delivery_method: "Moto",
            cnh: "images/cnh-digital.jpg"
        }

        return data;
    }
}