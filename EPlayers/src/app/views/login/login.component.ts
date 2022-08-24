import { Component, OnInit } from '@angular/core';

import { faUser, faEnvelope, faLock, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  

  constructor(private userService: UserService) { }

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

  mostrarNome(): any{
    this.nomeAluno = this.userModel.nome;
  }
//Funçao de Login
  signin(){
//fazer validaçao
    // console.log(this.userModel);

    this.userService.signin(this.userModel).subscribe((response) => {
      // console.log(response);
      this.mensagem = `Logado com Sucesso! ${response.status} ${response.statusText}`

    }, (e) =>{
      // console.log('Deu Pau', e.error);
      console.clear()
      this.mensagem = `${e.error} ${e.status} ${e.statusText}`
    })
  }
}

// (params) => {

// }