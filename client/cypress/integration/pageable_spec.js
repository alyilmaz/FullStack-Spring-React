/* eslint-disable no-unused-expressions */
/* eslint-disable no-loop-func */
/* eslint-disable no-undef */
describe("get pageable data", () =>{
    it("pageable button testing", () =>{
        cy.visit("/");  

        //verify enable and disbale pageable buttons
        cy.findByRole('button', {  name: /next/i}).should("be.enabled");
        cy.findByRole('button', {  name: /last/i}).should("be.enabled");
        cy.findByRole('button', {  name: /first/i}).should("be.disabled");
        cy.findByRole('button', {  name: /previous/i}).should("be.disabled");

        //click the next button
        cy.findByRole('button', {  name: /next/i}).click();

        cy.findByRole('button', {  name: /next/i}).should("be.enabled");
        cy.findByRole('button', {  name: /last/i}).should("be.enabled");
        cy.findByRole('button', {  name: /previous/i}).should("be.enabled");
        cy.findByRole('button', {  name: /first/i}).should("be.enabled");

        //click the last button
        cy.findByRole('button', {  name: /last/i}).click();

        cy.findByRole('button', {  name: /next/i}).should("be.disabled");
        cy.findByRole('button', {  name: /last/i}).should("be.disabled");
        cy.findByRole('button', {  name: /previous/i}).should("be.enabled");
        cy.findByRole('button', {  name: /first/i}).should("be.enabled");

        //select 10 pageSize
        cy.get('select#pageSize ').select(1);

        //verify page Text
        cy.get('#text-page').should("have.text", "Page 1 of 50");
        cy.get('#text-rows').should("have.text", "Rows: 1 - 10 of 500");

    });

    it("searching test", () =>{
        cy.visit("/");  

        //searching name
        cy.findByRole('searchbox').type("goofy_bohr");


        //verify the all of the parameters
        cy.get('#name0').should("have.text", "goofy_bohr");
        cy.get('#id0').should("have.text", "506");
        cy.get('#status0').should("have.text", "COMPLETED");
        cy.get('#description0').should("have.text", "Voluptatem sed ipsum quisquam sed dolore adipisci eius.")
        cy.get('#delta0').should("have.text", "0");
        
        //verify number of searching
        cy.get('#text-page').should("have.text", "Page 1 of 1");
        
        //cy.get('select#select').select(2);
        
          //cy.findByTestId('up').click();
    });

    it("status filter testing", () =>{
        cy.visit("/");  

        cy.get('select#select').select(3);
        //1 second to get updated data
        cy.wait(1000);

        cy.get('#text-rows').then($elem => {
            let len = $elem.text().match(/\d+/g)[2];
            for (let i = 0; i < len; i++ ) {
                if(i !== 0 && i%5 ===0){
                   //click the next button
                    cy.findByRole('button', {  name: /next/i}).click(); 
                }
                //verify the status parameter
                cy.get(`#status${i%5}`).should("have.text", "ERROR");
            }
       })

    });

    it("sorting id button check", () =>{
        const checkId = (sort) =>{
            for(let i = 0; i<4; i++){ 
                cy.get(`#id${i}`).then($value => {
                    var currentValue = $value.text()
                    cy.get(`#id${i+1}`).then($value => {
                        var nextValue = $value.text();
                        expect(currentValue >= nextValue).to.be[sort];
                        });
                });
              }
        }
        cy.visit("/"); 

        cy.get('#id-sort').click();

        cy.wait(500);
        cy.get('#id-sort').children().invoke('attr', 'id')
        .then((id) => {
          if(id === "up"){
              checkId(false);
          }
          if(id === "down"){
            checkId(true);
        }
        })

        cy.get('#id-sort').click();
        cy.wait(500);
        cy.get('#id-sort').children().invoke('attr', 'id')
        .then((id) => {
            if(id === "up"){
                checkId(false);
            }
            if(id === "down"){
              checkId(true);
          }
    })
    });

    it("sorting name button check", () =>{
        var checkName = (sort) =>{
            for(let i = 0; i<4; i++){ 
                cy.get(`#name${i}`).then($value => {
                    var currentValue = $value.text()
                    cy.get(`#name${i+1}`).then($value => {
                        var nextValue = $value.text();
                        expect(currentValue.localeCompare(nextValue) >= 0).to.be[sort];
                        });
                });
              }
        }
        cy.visit("/"); 

        cy.get('#name-sort').click();

        cy.wait(500);
        cy.get('#name-sort').children().invoke('attr', 'id')
        .then((id) => {
            if(id === "down"){
                checkName(true)
            }
            if(id === "up"){
                checkName(false)
            }
        })

        cy.get('#name-sort').click();
        cy.wait(500);
        cy.get('#name-sort').children().invoke('attr', 'id')
        .then(id => {
          if(id === "down"){
              checkName(true)
          }
          if(id === "up"){
              checkName(false)
          }
        })
    });

    it("sorting created on button check", () =>{
        var checkCreatedOn = (sort) =>{
            for(let i = 0; i<19; i++){ 
                cy.get(`#createdOn${i}`).then($value => {
                    var currentValue = $value.text()
                    cy.get(`#createdOn${i+1}`).then($value => {
                        var nextValue = $value.text();
                        expect(new Date(currentValue) > new Date(nextValue)).to.be[sort];
                        });
                });
              }
        }
        cy.visit("/"); 

        cy.get('#createdOn-sort').click();

         //select 20 pageSize
        cy.get('select#pageSize ').select(3);

        for(let i=0; i<10; i++){
            cy.findByRole('button', {  name: /next/i}).click();
            cy.wait(100); 
        }

        cy.wait(500);
        cy.get('#createdOn-sort').children().invoke('attr', 'id')
        .then((id) => {
            if(id === "down"){
                checkCreatedOn(true)
            }
            if(id === "up"){
                checkCreatedOn(false)
            }
        })

        cy.get('#createdOn-sort').click();
        cy.wait(500);
        cy.get('#createdOn-sort').children().invoke('attr', 'id')
        .then(id => {
          if(id === "down"){
            checkCreatedOn(true)
          }
          if(id === "up"){
            checkCreatedOn(false)
          }
        })
    });
})