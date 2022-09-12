import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import { faUser, faEnvelope, faLock, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  

  constructor(private userService: UserService, private router: Router) { 
    
  }

  ngOnInit(): void {
  }
  //nossas funcionalidades
  
  faUser= faUser
  faEnvelope= faEnvelope
  faLock= faLock
  faArrowLeft= faArrowLeft

  userModel = new User() //modelo/model
  nomeAluno : any = ""
  mensagem: string = ""

  mostrarNome(): any {
    this.nomeAluno = this.userModel.nome;
  }
  validaLogin(): boolean{
    // palavras chaves que se esta proibindo
    let blackList = ["SELECT", "OR", ' ""="" ', "-- ", "; ", "1 = 1", "1=1", "DROP", "\"\"=\"\"", "'='",]; 
    
    let ataque = 0;

    blackList.forEach((palavra) => {
      if (this.userModel.email?.toUpperCase().includes(palavra)) {
          ataque++;
          
      }
    })
// console.log ('Ataquee',ataque);

    // if (ataque > 0){

    //   return false;
    // }

    if ( this.userModel.nome === undefined ||this.userModel.nome === '' ||
      this.userModel.email === undefined ||this.userModel.email === '' || 
      this.userModel.password === undefined ||this.userModel.password === '' ||
      ataque > 0
    ){
      return false;
  }   else{
      return true;
  }
  
}
//Funçao de Login
signin(){
  //fazer validaçao
  if ( this.validaLogin()){

    // console.log(this.userModel);

    this.userService.signin(this.userModel)
    .subscribe(
      {
         next:(response) => {
         
          this.mensagem = `Logado com Sucesso! ${response.status} ${response.statusText}`

          this.router.navigate([''])
          
        },
        
          error: (e) => {
          // console.log('Deu Pau', e);
          // console.clear()
          this.mensagem = `${e.error} ${e.status} ${e.statusText}`
        }
      }
    )
   

    } else{
      
      console.log(this.userModel);
      this.mensagem = "Preencher todos os campos corretamente "
    }

  }
}
