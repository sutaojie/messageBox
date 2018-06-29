var APP_ID = 'H66LtI2x3YIJHYwiVI0nscEF-gzGzoHsz';
var APP_KEY = '8GL22aDbFdkEf5XuuaxYOQuQ';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

let myForm = document.querySelector('#messagePostForm')
myForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let content = document.querySelector('input[name=content]').value
    var Message = AV.Object.extend('Message');
    var message = new Message();
    message.save({
        content: content
    }).then(function(object) {
        alert('成功');
        console.log(object);
    })
})

/*
var TestObject = AV.Object.extend('TestObject');
var testObject = new TestObject();
testObject.save({
  words: 'Hello World!'
}).then(function(object) {
  alert('LeanCloud Rocks!');
})
*/