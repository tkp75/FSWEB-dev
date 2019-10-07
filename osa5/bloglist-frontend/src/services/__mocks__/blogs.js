const blogs = [
  {
    id: '5a451df7571c224a31b5c8ce',
    title: 'Is Testing Fun',
    author: 'Alter Ego',
    url: 'http://dev.nul',
    likes: 0,
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'devnul',
      name: 'Minä Itse'
    }
  },
  {
    id: '5a451e21e0b8b04a45638211',
    title: 'Testing Is Fun',
    author: 'God Almighty',
    url: 'https://',
    likes: 1,
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'meme',
      name: 'Me, Myself and I'
    }
  },
  {
    id: '5a451e30b5ffd44a58fa79ab',
    title: 'Fun Is Testing',
    author: 'Devil Inside',
    url: 'gopher.unix.org 70/Tgophers_united%09extinct',
    likes: 666,
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'M$',
      name: 'alias'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }
