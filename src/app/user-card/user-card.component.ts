import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";
import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "user-card",
  standalone: true,
  imports: [FormsModule, CommonModule, SharedModule],
  templateUrl: "./user-card.component.html",
  styleUrl: "./user-card.component.scss"
})
export class UserCardComponent
  implements
    OnInit,
    OnDestroy,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterViewInit,
    AfterContentChecked,
    AfterViewChecked
{
  @Input() name: string = ""; //Se pone input cuando se quiere recibir datos del padre
  @Input() email: string = "";

  @Output() sendData = new EventEmitter()

  @ViewChild('buttonTest', { static: false }) buttonTest!: ElementRef
  @ViewChild('buttonShow', { static: true }) buttonShow!: ElementRef

  password: string = "password";
  showButton:boolean = true

  constructor() {
    //console.log("user card constructor");
  }
  ngAfterContentInit(): void {
    throw new Error("Method not implemented.");
  }

  ngAfterContentChecked(): void {
    //console.log('AFTER CONTENT CHECKED')
  }

  ngOnInit(): void {
    //console.log("user card on init");
    this.buttonShow.nativeElement.textContent = 'button Show in OnInit'
    // this.password = this.name + ' ' +  this.email + ' PASSWORD'
  }
  ngOnDestroy(): void {
    //console.log("user card Destroy"); 
  }
  ngOnChanges(changes: SimpleChanges): void {
    //console.log("CHANGES:", changes);

    this.password =
      changes["name"].currentValue +
      " " +
      changes["email"].currentValue +
      " PASSWORD";
  }

  ngDoCheck(): void {
    //console.log("DO CHECK user card")  
   }

   ngAfterViewInit(): void {
    //console.log('NG AFTER VIEW INIT')
    //console.log('BUTTON TEST', this.buttonTest)   
    if(this.buttonTest){
      this.buttonTest.nativeElement.textContent = 'button Test in OnInit'
    }
  }

  ngAfterViewChecked(): void {
    //console.log('NG AFTER VIEW CHECKED')
  }

  public onSendData() {
    //console.log('onSendData in child')
    this.sendData.emit("Hi from child component");
  }
  
}
