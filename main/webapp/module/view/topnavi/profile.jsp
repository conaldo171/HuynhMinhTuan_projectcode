<%@include file="../../../module/view/common/Permission.jsp"%>
<div class="container-fluid" id="topnavi_profile">

<div class="box">
        <div class="box-header">
         <span class="title" style="font-size:15px;" text="personalsetting">Personal Setting</span>
        </div>
        <div class="box-content">
          <div class="tab-content">
          <!-- persional setting -->
            <div id="persional" class="tab-pane active">
              <div class="row-fluid">
              	<form data-validate="parsley" class="separate-sections" id="form-persional">
					<p class="alert-error hide" text="fillwrong">You must fill in all of the fields.</p>
		         <div class="fields">
		         	<label text="name">Name</label>
		         	<div class="input-prepend yourname">
		          <!-- <span class="add-on">
		            <i class="icon-user"></i>
		          </span>-->
		            <input text="firstname" type="text" data-trigger="focusout" data-required="true" placeholder="Firstname" value="" id="firstname" class="parsley-validated">
		            <input text="lastname" type="text" data-trigger="focusout" data-required="true" placeholder="Lastname" value="" class="lastname parsley-validated" id="lastname">
		          </div>
		         </div> 
		          
		         <div class="fields">
		         	<label text="email">Email</label> 
		          <div class="input-prepend">
		          <!-- <span class="add-on">
		            <i class="icon-envelope"></i>
		          </span>-->
		            <input type="text" placeholder="Email" value="" readonly id="email" text="email">
		          </div>
		          </div>
				
				<div class="fields">
		         	<label text="cellphone">Cell Phone</label>
		          <div class="input-prepend">
		          <!-- <span class="add-on">
		            <i class="icon-phone"></i>
		          </span>-->
		            <input text="cellphone" type="text" id="cell_phone" data-type="phone" data-required="true" data-trigger="focusout" placeholder="Cell phone" value="" id="cellphone" class="parsley-validated">
		          </div>
		          </div>
				
				<div class="fields">
		         	<label text="companyname">Company name</label>
		          <div class="input-prepend">
		          <!-- <span class="add-on">
		            <i class="icon-building"></i>
		          </span>-->
		            <input text="companyname" type="text" id="company_name" data-required="true" data-trigger="focusout" placeholder="Company name" value="" class="parsley-validated">
		          </div>
		         </div>
		         
		         <div class="fields">
		         	<label text="companywebsite">Company website</label>
		          <div class="input-prepend">
		          <!-- <span class="add-on">
		            <i class="icon-sitemap"></i>
		          </span>-->
		            <input text="companywebsite" type="text" id="company_website" data-required="true" data-type="url" data-trigger="focusout" placeholder="Company website" value="" class="parsley-validated">
		          </div>
		          </div>
		          
		          <div class="fields">
		         	<label text="companyaddress">Company address</label>
		          <div class="input-prepend">
		          <!-- <span class="add-on">
		            <i class="icon-map-marker"></i>
		          </span>-->
		            <input text="companyaddress" type="text" id="company_address" data-required="true" data-trigger="focusout" placeholder="Company address" value="" class="parsley-validated">
		          </div>
		          </div>
				  <div class="block-button">
				  	<button class="btn btn-blue" type="button" id="btnSave" onclick="saveUserProfile();" text="save">Save</button>
				  	<!-- <button class="btn btn-blue" type="button" id="btnCancle">Cancel</button> -->
				  </div>
		        </form>
              </div>
            </div>
         
          </div>
        </div>
      </div>


</div>