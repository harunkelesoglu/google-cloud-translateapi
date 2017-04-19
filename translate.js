#!/usr/bin/env node
const sys = require('util')
const exec = require('child_process').exec;
const notifier = require('node-notifier');
const path = require('path');
const Translate = require('@google-cloud/translate');



const translateClient= Translate({
  projectId: "" // Buraya projectid yi yazacaksınız
});


// xclip clipboarda bulunan texti öğrenmeniz için kullanılan bir komuttur
//Eğer sisteminizde yoksa `sudo apt-get install xclip` komutu ile kurabilirsiniz
exec("xclip -o", function (error, stdout, stderr) {
 if(error) throw error;
translateClient.detect(stdout).then((results)=>{
	let lang=results[0].language;
	let target;
	if(lang=="tr")
		target="en";
	else
		target="tr"

	translateClient.translate(stdout,target)
				   .then(function(results){
				   		run(stdout,results[0]);
				   });

});

 

});

function run(text,translate){
	
notifier.notify({
  title: 'GNU Translator',
  message: text+" - "+translate,
  icon: path.join('/home/fr33/Resimler/linux.png'), // Buraya istediğini bir icon yolunu belirtebilirsiniz
  
}, function (err, response) {
  if(err) throw err;
  console.log(response);
});
}




