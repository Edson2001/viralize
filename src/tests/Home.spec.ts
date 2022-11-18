import { mount } from '@vue/test-utils'
import Home from '../Page/Home.vue'
import Card from '../components/Card.vue'

describe('Testar funcionalidades da página home', () => {
  describe('Testar o component card', () => {
    it('Verificar se as props estão sendo bem passadas', () => {

      const propsCard = {
        descriptionPost: "test",
        imageBackground: 'https://initialcommit.com/img/initialcommit/baby-git-release.png',
        titlePost: 'test'
      }

      const wrapper = mount(Card, { 
        props: propsCard,
      })

      expect(wrapper.find('h5').text()).toEqual(propsCard.titlePost)
      expect(wrapper.find('p').text()).toEqual(propsCard.descriptionPost)
      expect(wrapper.find('img').attributes('src')).toEqual(propsCard.imageBackground)

    })
  })

  it('cadastrar nova postagem', async () => {

   let message = 'Postagem cadastrada com sucesso!'
   const wrapper = mount(Home)
   

   const titleTextInput = wrapper.find('#titleInput')
   const descriptionInput = wrapper.find('#descriptionInput')
   const ImageInput = wrapper.find('#ImageInput')

   titleTextInput.setValue('test')
   descriptionInput.setValue('test')
   ImageInput.setValue('https://initialcommit.com/img/initialcommit/baby-git-release.png')
   
   await wrapper.find('#post').trigger('click')
   
   expect(await wrapper.find("#message").text()).toEqual(message)

  })
 
})