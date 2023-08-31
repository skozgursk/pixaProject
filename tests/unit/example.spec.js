/* eslint-disable */
import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import UsersList from '@/components/UsersList.vue'
import { setActivePinia, createPinia } from 'pinia'
import { useAppStore } from '@/store/app';
import App from '@/App.vue';

describe('UsersList.vue', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })
  it('add data to store', () => {
    const store = useAppStore();
    store.addTestData({
      authUser: {
        "id": 1,
        "name": "Dummy User 1",
        "lastMessage": "hello dummy",
        "lastMessageTime": 1693404732,
        "image": "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
        "messageId": "mesaj-1"
      },
      users: [
        {
          "id": 1,
          "name": "Dummy User 1",
          "lastMessage": "hello dummy",
          "lastMessageTime": 1693404732,
          "image": "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
          "messageId": "mesaj-1",
          "phone": "555555555",
          "about": "dont bother me please",
          "sharedMedia": [],
          "userGroupsNames": ["İş grup", "aile grup", "my grup"]
        },
        {
          "id": 2,
          "name": "Dummy User 2",
          "lastMessage": "hello dummy 3",
          "lastMessageTime": 1693404732,
          "image": "https://image.shutterstock.com/image-photo/pure-youth-crazy-english-cocker-260nw-1424153078.jpg",
          "messageId": "mesaj-2",
          "phone": "555555555",
          "about": "dont bother me please",
          "sharedMedia": ["https://image.shutterstock.com/image-photo/pure-youth-crazy-english-cocker-260nw-1424153078.jpg", "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"],
          "userGroupsNames": ["İş grup", "aile grup", "my grup"]
        },
        {
          "id": 3,
          "name": "Dummy User 3",
          "lastMessage": "hello dummy 2",
          "lastMessageTime": 1693404732,
          "image": "https://img.rawpixel.com/private/static/images/website/2022-05/ns8230-image.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=b3961e17298745c0868eeef46211c3d0",
          "messageId": "mesaj-3",
          "phone": "555555555",
          "about": "dont bother me please",
          "sharedMedia": [],
          "userGroupsNames": ["İş grup", "aile grup", "my grup"]
        }
      ],
    });
    const wrapper = shallowMount(UsersList, {
      props: { }
    })
    expect(wrapper.text()).to.include('Dummy User 1');
    expect(wrapper.text()).to.include('Dummy User 2');
  })
  it('check data', () => {
    const wrapper = shallowMount(UsersList, {
      props: { }
    })
    expect(wrapper.text()).to.include('Dummy User 7');
  })
})
/* eslint-enable */
