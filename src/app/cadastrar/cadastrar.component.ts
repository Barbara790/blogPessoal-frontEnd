import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  user: User = new User
  confirmarSenha: string
  tipoUsu: string

  constructor(
    private authService: AuthService,
    private router: Router
    ) { 
    
  }

  ngOnInit() {
    window.scroll(0,0)
  }

  confirmSenha(event:any){
    this.confirmarSenha = event.target.value
  }

  tipoUser(event:any){
    this.tipoUsu = event.target.value
  }

  cadastrar(){
    this.user.tipoUsuario = this.tipoUsu

    if(this.user.senha != this.confirmarSenha ){
      alert("A senhas digitadas são diferentes")
    }
    else{
      this.authService.cadastrar(this.user).subscribe((resposta:User) =>{
        this.user=resposta
        this.router.navigate(['/entrar'])
        alert('Usuario cadastrado com sucesso!')
      })

    }

  }


}
