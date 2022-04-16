import signup from '../Pages/SignupPages'
import signupFactory from '../factories/SignupFactory'
import SignupPages from '../Pages/SignupPages';

describe('Signup', ()=>{    

    /*beforeEach(function() {
        cy.fixture('deliver').then((d)=>{
            this.deliver = d;

        });
    })*/

    it('Signup deliver', function(){        

        var deliver = signupFactory.deliver();
        
        signup.go();
        signup.fillForm(deliver);
        signup.submit();
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.';
        signup.modalContentShouldBe(expectedMessage)        
    })

    it('CPF wrong', function(){      
        var deliver = signupFactory.deliver();

        deliver.cpf = '57312943aa'

        signup.go();
        signup.fillForm(deliver);
        signup.submit();
        signup.alertMessageShouldBe('Oops! CPF inválido');
    })
    it('E-mail wrong', function(){      
        var deliver = signupFactory.deliver();

        deliver.email = 'user.com.br'

        signup.go();
        signup.fillForm(deliver);
        signup.submit();
        signup.alertMessageShouldBe('Oops! Email com formato inválido.');
    })

    context('Required fields', function(){
        const messages = [
            {field: 'name', output: 'É necessário informar o nome'},
            {field: 'cpf', output: 'É necessário informar o CPF'},
            {field: 'email', output: 'É necessário informar o email'},
            {field: 'postalcode', output: 'É necessário informar o CEP'},
            {field: 'address-number', output: 'É necessário informar o número do endereço'},
            {field: 'delivery_method', output: 'Selecione o método de entrega'},
            {field: 'CNH', output: 'Adicione uma foto da sua CNH'},
        ]

        before(function(){
            signup.go();
            signup.submit();
        })

        messages.forEach(function(msg){
            it(`${msg.field} is required`, function(){
                SignupPages.alertMessageShouldBe(msg.output);
            })
        })
    })

    /*it('Required fields', function(){
        signup.go();
        signup.submit();
        signup.alertMessageShouldBe('É necessário informar o nome');
        signup.alertMessageShouldBe('É necessário informar o CPF');
        signup.alertMessageShouldBe('É necessário informar o email');
        signup.alertMessageShouldBe('É necessário informar o CEP');
        signup.alertMessageShouldBe('É necessário informar o número do endereço');
        signup.alertMessageShouldBe('Selecione o método de entrega');
        signup.alertMessageShouldBe('Adicione uma foto da sua CNH');
        
    })*/
})