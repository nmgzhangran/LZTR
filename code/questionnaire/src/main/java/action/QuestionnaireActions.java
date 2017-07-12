package action;

import service.QuestionnaireService;

import java.io.IOException;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import org.json.JSONObject;
import org.json.JSONArray;

import model.User;
import model.Questionnaire;
import model.QuestionnaireQuestions;


public class QuestionnaireActions extends BaseAction{
	private QuestionnaireService quesService;
	private int id;
	private int userid;
	private String title;
	private String status; 		/* unp(default), pub, end, or ban */
	private int isPublic;    	/* 1(default) or 0 */
	private Date releaseTime;
	private Date endTime;
	private String condi;
	private String content;
	
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getCondi() {
		return condi;
	}
	public void setCondi(String condi) {
		this.condi = condi;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getUserid() {
		return userid;
	}
	public void setUserid(int userid) {
		this.userid = userid;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public int getIsPublic() {
		return isPublic;
	}
	public void setIsPublic(int isPublic) {
		this.isPublic = isPublic;
	}
	public Date getReleaseTime() {
		return releaseTime;
	}
	public void setReleaseTime(Date releaseTime) {
		this.releaseTime = releaseTime;
	}
	public Date getEndTime() {
		return endTime;
	}
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	public void setQuesService(QuestionnaireService quesService) {
		this.quesService = quesService;
	}
	
	/**
	 * Parse the questions with the string type into a list of questions
	 * @param questions
	 * @return
	 */
	
	/**
	 * Use appService to add a questionnaire,including its basic information and content
	 * @return
	 * @throws IOException 
	 */
	public String add() throws IOException{
		if(id!=0){
			Questionnaire ques = quesService.getQuestionnaireById(id);
			QuestionnaireQuestions quescontent = quesService.getQuestionnaireQuestionsById(id);
			ques.setTitle(title);
			quescontent.setContent(content);
			quesService.updateQuestionnaire(quescontent, ques);
			response().getWriter().write("success");
			return null;
		}
		if(status==null) status = "unp";
		int userid = ((User)request().getSession().getAttribute("user")).getId();
		Questionnaire ques = new Questionnaire(userid,status,title,isPublic,releaseTime,endTime);
		QuestionnaireQuestions quescontent = new QuestionnaireQuestions(content);
		System.out.println(content);
		quesService.addQuestionnaire(quescontent, ques);
		response().getWriter().write("success");
		return null;
	}
	
	public String updateStatus() throws Exception {
		Questionnaire ques = quesService.getQuestionnaireById(id);
		ques.setStatus(status);
		quesService.updateQuestionnaire(ques);
		return "updateStatus";
	}
	
	
	/**
	 * Use appService to update a questionnaire,including its basic information and content
	 * @return
	 */
	public String update() throws Exception {
		Questionnaire ques = quesService.getQuestionnaireById(id);
		ques.setEndTime(endTime);
		ques.setIsPublic(isPublic);
		ques.setReleaseTime(releaseTime);
		ques.setStatus(status);
		ques.setTitle(title);
		quesService.updateQuestionnaire(ques);
		return "update";
	}
	
	/**
	 * Use appService to delete a questionnaire,including its basic information and content
	 * @return
	 */
	public String delete1(){
		Questionnaire ques = quesService.getQuestionnaireById(id);
		QuestionnaireQuestions quescontent = quesService.getQuestionnaireQuestionsById(id);
		quesService.deleteQuestionnaire(quescontent, ques);
		return "delete1";
	}
	
	public String delete2(){
		Questionnaire ques = quesService.getQuestionnaireById(id);
		QuestionnaireQuestions quescontent = quesService.getQuestionnaireQuestionsById(id);
		quesService.deleteQuestionnaire(quescontent, ques);
		return "delete2";
	}
	
	/**
	 * Use appService to get a questionnaire,including its basic information and content
	 * @return
	 * @throws IOException 
	 */
	public String get() throws IOException{
		Questionnaire ques = quesService.getQuestionnaireById(id);
		QuestionnaireQuestions quescontent = quesService.getQuestionnaireQuestionsById(id);
		JSONObject questot = new JSONObject(quescontent.getContent());
		questot.put("id", ques.getId());
		questot.put("title", ques.getTitle());
		response().getWriter().print(questot.toString());
		return null;
	}
	
	public String getInfo() throws IOException{
		Questionnaire ques = quesService.getQuestionnaireById(id);
		request().setAttribute("quesinfo", ques);
		return "getInfo";
	}
	
	/**
	 * Use appService to get basic information of all questionnaires
	 * @return
	 */
	public String all(){
		List<Questionnaire> questionnaires = quesService.getAllQuestionnaires();
		request().setAttribute("Questionnaires", questionnaires);
		return "all";
	}
	
	public String search() throws Exception{
		List<Questionnaire> Questionnaires = quesService.findQuestionnaires(condi);
		request().setAttribute("ResultList", Questionnaires);
		return "search";
	}
	
	public String My() throws Exception{
		User user = (User)session().getAttribute("user");
		int userid = user.getId();
		List<Questionnaire> Questionnaires = quesService.getQuestionnaireByUserId(userid);
		request().setAttribute("MyQuess", Questionnaires);
		return "My";
	}
}


