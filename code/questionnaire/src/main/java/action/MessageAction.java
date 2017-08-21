package action;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Date;
import java.util.List;

import model.Message;
import model.User;
import service.MessageService;

public class MessageAction extends BaseAction{
	private MessageService messageService;
	private String id;
	private int sid;
	private int rid;
	private int isread;
	private String msg;
	private Date senddate;
	
	public void setMessageService(MessageService messageService){
		this.messageService = messageService;
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
	public int getSid() {
		return sid;
	}
	public void setSid(int sid) {
		this.sid = sid;
	}
	
	public int getRid() {
		return rid;
	}
	public void setRid(int rid) {
		this.rid = rid;
	}
	
	public int getIsread() {
		return isread;
	}
	public void setIsread(int isread) {
		this.isread = isread;
	}
	
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	
	public Date getSenddate(){
		return senddate;
	}
	public void setSenddate(Date senddate){
		this.senddate = senddate;
	}
	
	//functions
	//发送消息，发送人一定是登录者
	public String send1() throws Exception{
		int userid = ((User)request().getSession().getAttribute("user")).getId();
		Message message = new Message(userid, rid, msg);
		messageService.addMessage(message);
		return "send1";
	}
	
	public String send2() throws Exception{
		int userid = ((User)request().getSession().getAttribute("user")).getId();
		Message message = new Message(userid, rid, msg);
		messageService.addMessage(message);
		return "send2";
	}
	
	//将一个消息变成已读
	public String read() throws Exception{
		Message message = messageService.getMsgById(id);
		messageService.update1Message(message);
		return "read";
	}
	
	//将一个消息设置为未读
	public String unread() throws Exception{
		Message message = messageService.getMsgById(id);
		messageService.update0Message(message);
		return null;
	}
	
	//得到用户所有发送的消息，sid为user id
	public String allSend() throws Exception{
		int userid = ((User)request().getSession().getAttribute("user")).getId();
		List<Message> messages = messageService.getMessageBySid(userid);
		request().setAttribute("SendMessages", messages);
		return "allSend";
	}
	
	//得到用户所有收到的消息,rid为user id
	public String allRece() throws Exception{
		int userid = ((User)request().getSession().getAttribute("user")).getId();
		List<Message> messages = messageService.getMessageByRid(userid);
		request().setAttribute("ReceMessages", messages);
		for(int i = 0; i < messages.size(); ++i){
			Message message = messages.get(i);
			messageService.update1Message(message);
		}
		return "allRece";
	}
}