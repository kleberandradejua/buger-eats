class SignupPage{

    go(){    
        
        cy.visit('/')

        //acesso a página de cadastro e verifcação de que está na página correta
        cy.get('a[href="/deliver"]').click();
        cy.get('#page-deliver form h1').should('have.text', 
        'Cadastre-se para  fazer entregas')
    }

    fillForm(deliver){
        cy.get('input[name="fullName"]').type(deliver.name);
        cy.get('input[name="cpf"]').type(deliver.cpf);
        cy.get('input[name="email"]').type(deliver.email);
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp);

        //preenchimento dos campos em Endereço
        cy.get('input[name="postalcode"]').type(deliver.address.postalcode);             
        cy.get('input[value="Buscar CEP"]').click();
        cy.get('input[name="address-number"]').type(deliver.address.number);

        //validando endereço trazido pelo CEP automático
        cy.get('input[name="address"]').should('have.value', deliver.address.street);
        cy.get('input[name="district"]').should('have.value', deliver.address.district);
        cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state);

        cy.contains('.delivery-method li', deliver.delivery_method).click();
        cy.get('input[accept^="image"]').attachFile(deliver.cnh);

    }

    submit(){
        cy.get('form button[type = "submit"]').click();
    }

    modalContentShouldBe(expectedMessage){
        cy.get('.swal2-container .swal2-html-container')
        .should('have.text', expectedMessage);
    }

    alertMessageShouldBe(expectedMessage){
        //cy.get('.alert-error').should('have.text', expectedMessage);
        cy.contains('.alert-error', expectedMessage).should('be.visible');
    }

}

export default new SignupPage;