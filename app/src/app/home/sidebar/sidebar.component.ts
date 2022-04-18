import { Component, OnInit } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    $(document).ready(function () {

      $('#sidebarExpand').on('click',function () {
        $('#sidebar').toggleClass('active');
      });
      

    });
    $(document).ready(function() {
      $('input[type="checkbox"]').on('click', function() {
        let inputValue = $(this).attr("value");
        $("." + inputValue).toggle();
      });
    });

  }
  

}
