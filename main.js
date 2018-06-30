! function() {

    var view = document.querySelector('#messageBox')
    var model = {
        init: () => {
            var APP_ID = 'H66LtI2x3YIJHYwiVI0nscEF-gzGzoHsz';
            var APP_KEY = '8GL22aDbFdkEf5XuuaxYOQuQ';
           	AV.init({ appId: APP_ID, appKey: APP_KEY });
        },
        queryMessage: ()=>{
            var query = new AV.Query('Message');
            return query.find()
        },
        save: (name, content) => {
            var Message = AV.Object.extend('Message');
            var message = new Message();
            return message.save({
                name: name,
                content: content
            })
        }
    }
    var controller = {
        view: null,
        model: null,
        init: function(view, model) {
        	this.view = view
        	this.model=model
            this.model.init()
        	// console.log(this.model.queryMessage())
            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('#messagePostForm')
            this.loadMessage()
            this.bindEvent()
        },

        loadMessage: function() {
        	console.log(this.model.queryMessage())
            this.model.queryMessage().then(function(message) {
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
        saveMessage: function() {
            let myForm = this.form
            let content = document.querySelector('input[name=content]').value
            let name = document.querySelector('input[name=name]').value
            this.model.save(name, content).then(function(object) {
                let li = document.createElement('li')
                li.innerText = `${object.attributes.name} : ${object.attributes.content}`
                var messageList = document.querySelector('#messageList')
                messageList.appendChild(li)
                document.querySelector('input[name=content]').value = ' '

            })
        }
    }
    controller.init(view,model)
}.call()