import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonContent, IonInfiniteScroll, IonTextarea, ModalController, PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DEFAULT_PAGINGPARAMS_TEAMCHAT, TeamChatMessage, TeamChatMessages_Request, TeamChatMessage_Add_Model, TeamChatMessage_Delete_Model } from 'src/app/models/chat';
import { ITeamChat_User_RoleData } from 'src/app/models/roles-models';
import { ChatService } from 'src/app/services/chat.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-chat',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit, OnDestroy {
  @ViewChild(IonContent) content: IonContent;
  @ViewChild('taNewMessage', { static: true }) taNewMessage: IonTextarea;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  scrollPageNumber: number = 0;

  userData: ITeamChat_User_RoleData;
  addChatMessage$: Subscription;
  getTeamChatMessagesSubscription: Subscription;
  deleteChatMessages$: Subscription;
  newMsg = '';

  constructor(
    public chatService: ChatService,
    public alertController: AlertController,
    private storageService: StorageService,
    private modalCtrl: ModalController
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.userData = await this.storageService.getUser_AuthSettings();

    this.chatService.buildConnection();
    this.chatService.addTeamChatMessagesListeners(this.userData.teamId);
    await this.chatService.startConnection(this.userData.userId, this.userData.teamId, this.content);

    this.chatService.teamChatData = [];
    this.loadData(null);
  }

  ngOnDestroy(): void {
    this.chatService.breakdownTeamChatConnection();

    if (this.addChatMessage$) {
      this.addChatMessage$.unsubscribe();
    }

    if (this.deleteChatMessages$) {
      this.deleteChatMessages$.unsubscribe();
    }

    if (this.getTeamChatMessagesSubscription) {
      this.getTeamChatMessagesSubscription.unsubscribe();
    }
  }

  ionViewWillEnter(){
    // need to do this so that footer sizes around text-area and isn't too low
    this.taNewMessage.value = "  ";
    this.taNewMessage.value = "";

    // alert("teamChatDataRecords: " + this.chatService.teamChatData?.length);
  }

  sendMessage() {
    this.taNewMessage.value = "";
    const postModel: TeamChatMessage_Add_Model = {
      message: this.newMsg,
      teamId: this.userData.teamId,
      userId: this.userData.userId,
      requestTimestampString: new Date().toLocaleString().replace(',', '')
    };

    this.addChatMessage$ = this.chatService.addChatMessage(postModel)
    .pipe(
      tap(()=>{
        this.chatService.ScrollToBottom(this.content);
      })
    )
      .subscribe();
  }

  async PresentPopover(ev: any, message: TeamChatMessage) {
    if (message.myMessage) {
      this.alertController.create({
        header: 'Delete Message',
        subHeader: message.message,
        message: "Are you sure you want to delete this message?",
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
            }
          },
          {
            text: 'Yes!',
            handler: () => {
              const postRequest: TeamChatMessage_Delete_Model = {
                messageId: message.messageId,
                teamId: message.teamId,
                userId: this.userData.userId
              }
              this.deleteChatMessages$ = this.chatService.deleteChatMessage(postRequest)
                .subscribe();
            }
          }
        ]
      }).then(res => {
        res.present();
      });
    }
  }

  loadData(event:any) {
    // if (event) {
    // }

    const requestModel: TeamChatMessages_Request = {
      userId: this.userData.userId,
      teamId: this.userData.teamId,
      pagingParams: {
        pageNumber: this.scrollPageNumber += 1,
        rowsPerPage: DEFAULT_PAGINGPARAMS_TEAMCHAT.rowsPerPage
      }
    }

    if (this.getTeamChatMessagesSubscription) {
      this.getTeamChatMessagesSubscription.unsubscribe();
    }

    this.getTeamChatMessagesSubscription = this.chatService.getTeamChatMessages(requestModel)
      .pipe(
        tap((data: TeamChatMessage[]) => {
          if (this.chatService.teamChatData?.length > 0) {
            if (data.length === 0) {
              if (this.infiniteScroll){
                this.infiniteScroll.disabled = true;
              }
            } else {
              this.chatService.teamChatData.unshift(...data);
            }
          } else {
            this.chatService.teamChatData = data;
            if (data.length < requestModel.pagingParams.rowsPerPage) {
              if (this.infiniteScroll){
                this.infiniteScroll.disabled = true;
              }
            }

            this.chatService.ScrollToBottom(this.content);
          }
          
          if (event){
            event.target.complete();
          }
        })
      )
      .subscribe();
  }

  cancelModal() {
    this.modalCtrl.dismiss();
  }

}
