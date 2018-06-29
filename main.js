! function() {

    var view = document.querySelector('#messageBox')
    var controller = {
        view: null,

        init: function(view) {
            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('#messagePostForm')
            this.initAV()
            this.loadMessage()
            this.bindEvent()
        },
        initAV: () => {
            var APP_ID = 'H66LtI2x3YIJHYwiVI0nscEF-gzGzoHsz';
            var APP_KEY = '8GL22aDbFdkEf5XuuaxYOQuQ';
            AV.init({ appId: APP_ID, appKey: APP_KEY });
        },
        loadMessage: () => {
            var query = new AV.Query('Message');
            query.find().then(function(message) {
                var messages = []
                message.map((item) => { messages.push(item.attributes) })
                messages.forEach((item) => {
                    let li = document.createElement('li')
                    li.innerText = `${item.name} : ${item.content}`
                    this.messageList.appendChild(li)
                })
            });
        },
        bindEvent: function() {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault()
                this.saveMessage()
            })
        },
        saveMessage: () => {
            let myForm = this.form
            let content = document.querySelector('input[name=content]').value
            let name = document.querySelector('input[name=name]').value
            var Message = AV.Object.extend('Message');
            var message = new Message();
            message.save({
                name: name,
                content: content
            }).then(function(object) {
                let li = document.createElement('li')
                li.innerText = `${object.attributes.name} : ${object.attributes.content}`
                var messageList = document.querySelector('#messageList')
                messageList.appendChild(li)
                document.querySelector('input[name=content]').value = ' '

            })
        }
    }
    controller.init(view)
}.call()

