import { mount } from '@vue/test-utils'
import Home from '../Page/Home.vue'

describe('Testar funcionalidades da página home', () => {
  it('cadastrar nova postagem', async () => {

   const wrapper = await mount(Home)
  
   let message = 'Postagem cadastrada com sucesso!'
  
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