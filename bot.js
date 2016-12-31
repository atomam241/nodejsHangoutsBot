var owner = 'Owen' //enter your name here


//setup webshot----------------------------------------
var webshot = require('webshot');
//Setup ECTOR------------------------------------------not yet

//Setup Cleverbot--------------------------------------
var Cleverbot = require('cleverbot-node');
cleverbot = new Cleverbot;
//setup Urban------------------------------------------
var urban = require('urban');
//Start setting up Hangouts----------------------------
var Client = require('hangupsjs');
var Q = require('q');
// callback to get promise for creds using stdin. this in turn
// means you must fire up your browser and get the
// requested token.
var creds = function() {
	return {
		auth: Client.authStdin
	};
};
var client = new Client();
// set more verbose logging (we dont need that)
//client.loglevel('debug');
//Done setting up ************************************


// start a connection to Hangouts
client.connect(creds).then(function() {
	var talkback = [0,'UgyXKhYKRXvjphIs0254AaABAQ'];
	//on recieving a chat message
	client.on('chat_message', function(ev) {

		console.log("talkback=" + talkback);

		//If i didn't send the message
		if (ev.sender_id.chat_id != ev.self_event_state.user_id.chat_id /* || ev.sender_id.chat_id != 112931905341988013157*/ ) {


			//this is the check for commands & images part
			if (ev.chat_message.message_content.segment == null) {
				client.sendchatmessage(ev.conversation_id.id, [
					[0, "Rad Image!"]
				]);

			} else if (ev.chat_message.message_content.segment[0].text.charAt(0) == '/') { //its a cmd

				// this alerts for debug purposes
				console.log('Msg is: ' + ev.chat_message.message_content.segment[0].text);
				//console.log('Sender is: ' + ev.sender_id.chat_id);
				//console.log('I am: ' + ev.self_event_state.user_id.chat_id + '\n');

				if (ev.chat_message.message_content.segment[0].text.indexOf('title') == 1) { //change the convo title
					var newtitle = ev.chat_message.message_content.segment[0].text.split("/title");
					client.renameconversation(ev.conversation_id.id, newtitle[1]);

				} else if (ev.chat_message.message_content.segment[0].text.indexOf('define') == 1) { //define from urban dictionary (Much fun!)
					var defWord = ev.chat_message.message_content.segment[0].text.split("/define");
					defWord = urban(defWord[1]);
					defWord.first(function(def) {

						if (def == null) {
							client.sendchatmessage(ev.conversation_id.id, [
								[0, "Not In Urban Dictionary!"]
							]);
						} else {

							client.sendchatmessage(ev.conversation_id.id, [
								[0, (def.word + ": " + def.definition)]
							]);

						}
					});

				} else if (ev.chat_message.message_content.segment[0].text.indexOf('//') == 0) {

					console.log('ignored: ' + ev.chat_message.message_content.segment[0].text);


				} else {
					switch (ev.chat_message.message_content.segment[0].text) {
						case '/commands':
							client.sendchatmessage(ev.conversation_id.id, [
								[0, "'/lenny', '/owner', '/egg', '/title', '/leave', '/define', '//'"] //i dont show /off and /on to prevent abuse
							]);

							break;

						case '/lenny': //I stole this from https://github.com/KraXarN/KraxBot/blob/master/kraxbot.js line 210
							var lenny = ['( ͡° ͜ʖ ͡°)', 'ᕦ( ͡° ͜ʖ ͡°)ᕤ', '(ง ͠° ͟ل͜ ͡°)ง', 'ヽ༼ຈل͜ຈ༽ﾉ', '( ͡°╭͜ʖ╮͡° )', 'ᕕ༼ຈل͜ຈ༽ᕗ', 'ヽ༼Ὸل͜ຈ༽ﾉ', '¯_(ツ)_/¯', '(∩ ͡° ͜ʖ ͡°)⊃━☆ﾟ. * ･', '(◞≼◉ื≽◟ ;益;◞≼◉ื≽◟)', '( ͝° ͜ʖ͡°)つ', 'ヽ( ͡°╭͜ʖ╮͡° )ﾉ', '༼凸 ◉_◔༽凸', 'ヽ༼✿σل͜ σ༽ﾉ', '( ͡⚆ ͜ʖ ͡⚆)', 'ヽ༼⚆ل͜⚆༽ﾉ', '( ͡ _ ͡°)ﾉ⚲', '♫ ┌༼ຈل͜ຈ༽┘ ♪', 'ಠ⌣ಠ', '༼ ಥل͟ಥ ༽ ┬┴┬┴┤', '༼ ಠل͟ಠ༽', 'ᕕ( ͡° ͜ʖ ͡°)ᕗ', '༼ง ͠ຈ ͟ل͜ ͠ຈ༽ง', '|༼ʘ ل͜ ʘ༽|', 'ヽ༼◕ل͜◕༽ﾉ', 'ζ༼Ɵ͆ل͜Ɵ͆༽ᶘ', '(° ͜ʖ°)', 'ヽ༼ ツ ༽ﾉ', '（͡°͜ʖ͡°）', '(╯°□°)╯︵ ┻━┻', '༼ʕっ•ᴥ•ʔっ', '( ＾◡＾)っ✂╰⋃╯', 'ヽ༼ ຈل͜ຈ༼ ຈل͜ຈ༽ຈل͜ຈ ༽ﾉ', '༼ - ل͜ - ༽', 'ヽ° ~͜ʖ~ °ﾉ ', 'ᕙ (° ~͜ʖ~ °) ᕗ', '乁( ◔ ౪◔)ㄏ', '༼ つ ◕_◕ ༽つ', 'ヽ༼ຈل͜ರೃ༽ﾉ', '୧༼ಠ益ರೃ༽୨', '( ﾉ ﾟｰﾟ)ﾉ', 'ヽຈل͜ຈﾉ', 'ヽ(ﾟｰﾟヽ)', 'ヽ༼ຈ益ຈ༽ﾉ', '(☢益☢t)', '༼ᕗຈل͜ຈ༽ᕗ', '╮(╯▽╰)╭', '╮(╯ل͜╰)╭', '༼ つ◕(oo)◕༽つ', '(ι´Д｀)ﾉ', 'ヽ༼◥▶ل͜◀◤༽ﾉ', '[̲̅$̲̅(̲̅ヽ̲̅༼̲̅ຈ̲̅ل͜ຈ̲̅༽̲̅ﾉ̲̅)̲̅$̲̅]', '[̲̅$̲̅(̲̅ ͡◥▶ ͜ʖ ͡◀◤)̲̅$̲̅]', '༼ ͠ຈ ͟ل͜ ͠ຈ༽ง', 'ヽ༼ຈل͜ຈ༽ﾉ☂', '(＾◡＾)っ', '༼☯﹏☯༽', 'ヽ༼ ☭ل͜☭ ༽ﾉ', '♌༼✪ل͜✪༽ᕤ', '(͡◔ ͜ʖ ͡◔)', 'ヽ༼ʘ̚ل͜ʘ̚༽ﾉ', '─=≡Σ((( つ◕ل͜◕)つ', 'ᕕ( ᐛ )ᕗ', '༼ຈل͜ຈ༽>ง', 'ᕙ༼◕ل͜◕༽ᕗ', 'ヽ༼ຈل͜ຈ༽ﾉ︵┻━┻', '୧༼ ͡◉ل͜ ͡◉༽୨ ', '༼ ͡■ل͜ ͡■༽', '(ง⌐□ل͜□)ง', 'Ѱζ༼ᴼل͜ᴼ༽ᶘѰ', 'ヽ༼ຈل͜ຈ༽ง', '( ° ͜ʖ͡°)╭∩╮', 'ɳ༼ຈل͜ຈ༽ɲ', '(~˘▾˘)~', 'ʕ•ᴥ•ʔ', 'ヽຈل͜ﾉ༼ຈ', '(☞ﾟヮﾟ)☞', '୧༼ಠ益ಠ༽୨', '(▀̿̿Ĺ̯̿̿▀̿ ̿)', '(ﾉಠ_ಠ)ﾉ', '└(°ᴥ°)┘', 'つ◕ل͜◕)つ', 'ლ(́◉◞౪◟◉‵ლ)', 'ヽ༼♥ل͜♥༽ﾉ', '༼ ᓄºل͟º ༽ᓄ', '(ง ͠° ͟ل͜ ͡°)ง', 'ヽ༼ຈل͜ຈ༽ﾉ', 'ᕦ༼ຈل͜ຈ༽ᕤ', '┌༼ຈل͜ຈ༽┐', 'ᕙ༼ຈل͜ຈ༽ᕗ', 'ヽ༼>ل͜<༽ﾉ', '( ͡° ͜ʖ ͡°)', 'ヽ༼@ل͜ຈ༽ﾉ', '༼ ºل͟º༼ ºل͟º༽ºل͟º ༽', 'ヽ( ͝° ͜ʖ͡°)ﾉ', '[̲̅$̲̅(̲̅ ͡° ͜ʖ ͡°̲̅)̲̅$̲̅]'];
							var ranlen = Math.floor(Math.random() * lenny.length);
							client.sendchatmessage(ev.conversation_id.id, [
								[0, lenny[ranlen]]
							]);

							break;

						case '/owner':
							client.sendchatmessage(ev.conversation_id.id, [
								[0, owner + " (the coolest btw)"]
							]);

							break;

						case '/egg':
							var egg = ['ponies', 'pitchforks', 'bikeshed', 'shydino'];
							var ranegg = Math.floor(Math.random() * egg.length);
							client.sendeasteregg(ev.conversation_id.id, egg[ranegg]);

							break;

						case '/leave': //this only works in group chats.
							client.sendchatmessage(ev.conversation_id.id, [
								[0, "Goodbye."]
							]);

							client.removeuser(ev.conversation_id.id); //leave the convo
							break;

						case '/off':
							//if (ev.sender_id.chat_id == SOME_ID) {} <-- Wrap these around for permission based cmds

							if (talkback.indexOf(ev.conversation_id.id) >= 0) {
								client.sendchatmessage(ev.conversation_id.id, [
									[0, "I'll will no longer speak and take web shots. until /on"]
								]);

								talkback.splice(talkback.indexOf(ev.conversation_id.id), 1);
							} else {
								client.sendchatmessage(ev.conversation_id.id, [
									[0, "Im already off!"]
								]);

							}
							break;

						case '/on':

							if (talkback.indexOf(ev.conversation_id.id) == -1) {
								client.sendchatmessage(ev.conversation_id.id, [
									[0, "I will now speak and take web shots. until /off"]
								]);

								talkback.push(ev.conversation_id.id);
							} else {
								client.sendchatmessage(ev.conversation_id.id, [
									[0, "Im not off!"]
								]);
							}
							break;

						default:
							client.sendchatmessage(ev.conversation_id.id, [
								[0, "Unknown Command"]
							]);
					}
				}
				//looking for hellos
			} 
			/*else if (ev.chat_message.message_content.segment[0].text.toLowerCase().replace(/[^0-9a-z]/gi, '') == 'hello' || ev.chat_message.message_content.segment[0].text.toLowerCase().replace(/[^0-9a-z]/gi, '') == 'hi' || ev.chat_message.message_content.segment[0].text.toLowerCase().replace(/[^0-9a-z]/gi, '') == 'hey' || ev.chat_message.message_content.segment[0].text.toLowerCase().replace(/[^0-9a-z]/gi, '') == 'sup') {

				var chat = [ev.sender_id.chat_id];
				client.getentitybyid(chat).then(function(info) {

					client.sendchatmessage(ev.conversation_id.id, [
						[0, "Hello " + info.entities[0].properties.first_name + "."]
					]);
				});

			} */
			else if (ev.chat_message.message_content.segment[0].text.indexOf('http') != -1) { //its a link

				if (talkback.indexOf(ev.conversation_id.id) >= 0) {

					var msg = ev.chat_message.message_content.segment[0].text;
					msg = msg.split(" ");

					msg.forEach(function(element, index, array) {
						if (String(element).indexOf("http") == 0) {

							var url = element.replace(/[^0-9a-z]/gi, '')

							var options = {
								windowSize: {
									width: 1920,
									height: 1080
								},
								shotSize: {
									width: 1920,
									height: 1080
								}
								//, quality: 75
							};
							webshot(element, 'webshots/' + url + '.png', options, function(err) {

								console.log('webshots/' + url + '.png');
								client.uploadimage('webshots/' + url + '.png').then(function(id) {
									console.log(id);
									client.sendchatmessage(ev.conversation_id.id,
										null,
										id);
								});
							});

						}
					});

				}

			} else { //cleverbot
				if (talkback.indexOf(ev.conversation_id.id) >= 0) {

					client.settyping(ev.conversation_id.id, Client.TypingStatus.TYPING); //start the bot typing
					// this alerts for debug purposes
					console.log('Msg is: ' + ev.chat_message.message_content.segment[0].text);
					//console.log('Sender is: ' + ev.sender_id.chat_id);
					//console.log('I am: ' + ev.self_event_state.user_id.chat_id + '\n');

					//initalize the clev session & ask
					Cleverbot.prepare(function() {
						cleverbot.write(ev.chat_message.message_content.segment[0].text, function(response) {

							//send response
							client.sendchatmessage(ev.conversation_id.id, [
								[0, response.message]
							]);
							client.settyping(ev.conversation_id.id, Client.TypingStatus.STOPPED); //the bot is 'stopped' typing

						});
					});
				}
			}

			/*this is the send function for reference :)
			
			client.sendchatmessage(ev.conversation_id.id, [
				[0, ev.chat_message.message_content.segment[0].text]
			]);
			
			*/
		}
	});
}).done();