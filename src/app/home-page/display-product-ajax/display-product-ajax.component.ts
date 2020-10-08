import {Component, OnInit} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-display-product-ajax',
  templateUrl: './display-product-ajax.component.html',
  styleUrls: ['./display-product-ajax.component.css']
})
export class DisplayProductAjaxComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    this.ajax();
  }

  ajax(): void {
    $(document).ready(function() {
      $('#load-du-lieu').click(function(e) {
        e.preventDefault();
        $.ajax({
          url: 'http://localhost:8080/getAllProduct',
          type: 'GET',
          dataType: 'JSON'
        }).done(function(ketqua) {
          console.log(ketqua);
          $('#noidung').html(ketqua);
        });

      });
    });
  }

}
