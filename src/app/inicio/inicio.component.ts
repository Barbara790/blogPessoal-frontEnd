import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema:number

  user: User = new User()
  idUser = environment.id

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService
  ) { }

  ngOnInit(){

    if(environment.token == ''){
    
      this.router.navigate(['/entrar'])
    }
    this.temaService.refreshToken()
    this.getAllTemas()
    this.getAllPostagens()
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resposta: Tema)=>{
      this.tema = resposta
    })
  }

  getAllTemas(){
    this.temaService.getAllTema().subscribe((resposta:Tema[]) => {
      this.listaTemas= resposta
    })
  }

  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resposta: Postagem[]) => {
      this.listaPostagens = resposta

    })

  }

  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resposta: User) => {
      this.user = resposta
    })
  }

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.id = this.idUser
    this.postagem.usuario = this.user

    this.postagemService.postPostagem(this.postagem).subscribe((resposta: Postagem)=>{
      this.postagem = resposta
      alert('Postagem realizada com sucesso!')
      this.postagem = new Postagem()
      this.getAllPostagens()
    })
  }

}
