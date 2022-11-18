import { mount } from '@vue/test-utils'
import Card from '../components/Card.vue'

describe('Testar funcionalidades do component card', () => {
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
 
})