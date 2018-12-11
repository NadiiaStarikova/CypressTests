describe('Edit by Author', () => {
    beforeEach(() => {
        const password1 = 'test00'
        const email1 = 'frank.coviner@gmail.com'
        cy.clearCookies()
        cy.visit('https://soapps.net/test/auth/')
        cy.server()
        cy.route('POST', '/test/auth/api/signin').as('login')
        cy.get('input#email').type(email1)
        cy.get('input#password').type(password1)
        cy.get('button').contains('Log In').click()
        cy.wait('@login')
        cy.visit('https://soapps.net/test/comments/api/page?pageUrl=https%3A%2F%2Fsoapps.net%2Ftest%2Fintegrations%2F%3FintegrationId%3D4cdd98b0-fd1d-11e8-aab2-5f4efcd0cc71%26integrationName%3DAutotests&pageTitle=Integrations&integrationId=4cdd98b0-fd1d-11e8-aab2-5f4efcd0cc71&frameUuid=dc23d8bb-c525-477f-ba21-3c3d3ef5cd05')
        cy.wait(2000)
    })

    it('Edit comment w/o effects', () => {
        cy.get('textarea').click().type('Comment')
        cy.get('span').contains('Post').click()
        cy.wait(2000)
        cy.get('span').contains('MORE...').click()
        cy.wait(500)
        cy.get('button').contains('Edit').click()
        cy.wait(500)
        cy.get('textarea').contains('Comment').click().type(' is Edited')
        cy.get('span').contains('SUBMIT').click()
        cy.get('span').contains('Comment is Edited').should('be.visible')
        })
    
    it('Edit comment with effect', () => {
        cy.get('i').contains('thumb_up').click()
        cy.wait(500)
        cy.get('span').contains('1').should('be.visible')
        cy.get('span').contains('MORE...').click()
        cy.wait(500)
        cy.get('button').contains('Edit').click()
        cy.wait(500)
        cy.get('span').contains('Once a reply or reaction has been made, you can no longer edit your comment. However, you still can add or remove images/videos!').should('be.visible')
        })
    
    it('Delete comment', () => {
        cy.get('textarea').click().type('Deleted Comment')
        cy.get('span').contains('Post').click()
        cy.wait(2000)
        cy.get('span').contains('MORE...').click()
        cy.wait(500)
        cy.get('button').contains('Edit').click()
        cy.wait(500)
        cy.get('span').contains('REMOVE COMMENT').click()
        cy.wait(1000)
        cy.get('span').contains('Deleted Comment').should('not.be.visible')
        /*cy.server()
        cy.route('POST', '/test/comments/api/comments/removeComment', {}).as('removeComment')
        cy.wait('@removeComment').then((response) => {
            cy.expect(response.status).to.eq(200)*/
        })
    
    it('Add image to comment', () => {
        cy.get('textarea').click().type('Comment with image')
        cy.get('span').contains('Post').click()
        cy.wait(2000)
        cy.get('span').contains('MORE...').click()
        cy.wait(500)
        cy.get('button').contains('Edit').click()
        cy.wait(500)
        cy.get('i').contains('image').click()
        cy.get('span').contains('Choose image for upload').should('be.visible')
        //image can't be added ???
        })
    
    it('Add valid video to comment', () => {
        cy.get('textarea').click().type('Comment with valid video')
        cy.get('span').contains('Post').click()
        cy.wait(2000)
        cy.get('span').contains('MORE...').click()
        cy.wait(500)
        cy.get('button').contains('Edit').click()
        cy.wait(500)
        cy.get('i').contains('ondemand_video').click()
        cy.wait(500)
        cy.get('input[type="text"]').click().type('https://www.youtube.com/watch?v=caRGpQvfPlA&t=210s')
        cy.get('span').contains('SUBMIT').click()
        cy.wait(2000)
        cy.get('.CommentContent__CommentVideoWrapper-cTIIsR > iframe').should('be.visible')
        })
    
    it('Delete video from comment', () => {
        cy.get('span').contains('MORE...').click()
        cy.wait(500)
        cy.get('button').contains('Edit').click()
        cy.wait(500)
        cy.get('i').contains('delete_forever').click()
        cy.wait(500)
        cy.get('.CommentContent__CommentVideoWrapper-cTIIsR > iframe').should('not.be.visible')    
        })
    
    it('Add invalid video to comment', () => {
        cy.get('textarea').click().type('Comment with invalid video')
        cy.get('span').contains('Post').click()
        cy.wait(2000)
        cy.get('span').contains('MORE...').click()
        cy.wait(500)
        cy.get('button').contains('Edit').click()
        cy.wait(500)
        cy.get('i').contains('ondemand_video').click()
        cy.wait(500)
        cy.get('input[type="text"]').click().type('https://www.useloom.com/share/c6a7971bb4ba48f59ea465bf2fb14192')
        cy.get('span').contains('SUBMIT').click()
        cy.wait(500)
        cy.get('span').contains('Please use valid YouTube or Vimeo video URL').should('be.visible')
        })
    
    it('Add emotion to own comment', () => {
        cy.get('i').contains('insert_emoticon').click()
        cy.wait(500)
        cy.get('div > span:nth-child(15) > i').click()
        cy.get('span').contains('SUBMIT').click()
        cy.wait(500)    
        cy.get('div > span:nth-child(1) > i').should('be.visible')    
        })

    it('Turn off replies to comment', () => {
        cy.get('textarea').click().type('Turn off replies to comment')
        cy.get('span').contains('Post').click()
        cy.wait(2000)
        cy.get('span').contains('MORE...').click()
        cy.wait(500)
        cy.get('button').contains('Edit').click()
        cy.wait(500)
        cy.get('i').contains('stop_screen_share').click()
        cy.wait(500)
        cy.get('span').contains('TURN OFF REPLIES FOR ').click()
        cy.wait(1000)    
        cy.get('button > span').contains('REPLY').trigger('mouseover')
        cy.get('span').contains('Replies are disabled').should('be.visible')
        //recheck
        })    
})

describe('Edit by Commenter', () => {
    beforeEach(() => {
        const password2 = 'test11'
        const email2 = 'frank.coviner+test11@gmail.com'
        cy.clearCookies()
        cy.visit('https://soapps.net/test/auth/')
        cy.server()
        cy.route('POST', '/test/auth/api/signin').as('login')
        cy.get('input#email').type(email2)
        cy.get('input#password').type(password2)
        cy.get('button').contains('Log In').click()
        cy.wait('@login')
        cy.visit('https://soapps.net/test/comments/api/page?pageUrl=https%3A%2F%2Fsoapps.net%2Ftest%2Fintegrations%2F%3FintegrationId%3D7b472c10-f972-11e8-aab2-5f4efcd0cc71%26integrationName%3DTest&pageTitle=Integrations&integrationId=7b472c10-f972-11e8-aab2-5f4efcd0cc71&frameUuid=29478476-96bc-4757-8cb8-24818754ad1b')
        cy.wait(2000)
    })

    it('Add emotion to other comment', () => {
        cy.get('i').contains('insert_emoticon').click()
        cy.wait(500)
        cy.get('div > span:nth-child(15) > i').click()
        cy.get('span').contains('SUBMIT').click()
        cy.wait(1000)    
        cy.get('span:nth-child(1) > span > i').should('be.visible')   
    })

    it('Hover on emotion', () => {
        cy.get('span:nth-child(1) > span > i').first().trigger('mouseover')  
        cy.get('span').contains('Test11').should('be.visible')  
        //recheck 
    })

    it('Click on emotion', () => {
        cy.get('span:nth-child(1) > span > i').first().click()
        cy.wait(500)    
        cy.get('#profile-iframe').should('be.visible')   
    })

    /*it('Add remark to other comment', () => {
        cy.get('span').contains('MORE...').click()
        cy.wait(500)
        cy.get('button').contains('Edit').click()
        cy.wait(500)
        cy.get('.CommentText__CommentTextWrap-ieORwI > .Linkify > .sc-bwzfXH').type('{selectall}')
        cy.get('span').contains('SUBMIT').click()
        cy.wait(1000)
    })
    Text selection isn't implemented in cypress yet, just in progress:
    https://github.com/cypress-io/cypress/issues/2839 */
   
})