// SIDEBAR DROPDOWN
const allDropdown = document.querySelectorAll('#sidebar .side-dropdown');
const sidebar = document.getElementById('sidebar');

allDropdown.forEach(item=> {
	const a = item.parentElement.querySelector('a:first-child');
	a.addEventListener('click', function (e) {
		e.preventDefault();

		if(!this.classList.contains('active')) {
			allDropdown.forEach(i=> {
				const aLink = i.parentElement.querySelector('a:first-child');

				aLink.classList.remove('active');
				i.classList.remove('show');
			})
		}

		this.classList.toggle('active');
		item.classList.toggle('show');
	})
})

sidebar.addEventListener('mouseenter', function () {
	if(this.classList.contains('hide')) {
		allDropdown.forEach(item=> {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.remove('active');
			item.classList.remove('show');
		})
		allSideDivider.forEach(item=> {
			item.textContent = item.dataset.text;
		})
	}
})

// PROFILE DROPDOWN
const profile = document.querySelector('nav .profile');
const imgProfile = profile.querySelector('img');
const dropdownProfile = profile.querySelector('.profile-link');

imgProfile.addEventListener('click', function () {
	dropdownProfile.classList.toggle('show');
})

// MENU
const allMenu = document.querySelectorAll('main .content-data .head .menu');

allMenu.forEach(item=> {
	const icon = item.querySelector('.icon');
	const menuLink = item.querySelector('.menu-link');

	icon.addEventListener('click', function () {
		menuLink.classList.toggle('show');
	})
})

window.addEventListener('click', function (e) {
	if(e.target !== imgProfile) {
		if(e.target !== dropdownProfile) {
			if(dropdownProfile.classList.contains('show')) {
				dropdownProfile.classList.remove('show');
			}
		}
	}

	allMenu.forEach(item=> {
		const icon = item.querySelector('.icon');
		const menuLink = item.querySelector('.menu-link');

		if(e.target !== icon) {
			if(e.target !== menuLink) {
				if (menuLink.classList.contains('show')) {
					menuLink.classList.remove('show')
				}
			}
		}
	})
})

// PROGRESSBAR
const allProgress = document.querySelectorAll('main .card .progress');

allProgress.forEach(item=> {
	item.style.setProperty('--value', item.dataset.value)
})

// APEXCHART
var options = {
  series: [{
  name: 'series1',
  data: [31, 40, 28, 51, 42, 109, 100]
}, {
  name: 'series2',
  data: [11, 32, 45, 32, 34, 52, 41]
}],
  chart: {
  height: 350,
  type: 'area'
},
dataLabels: {
  enabled: false
},
stroke: {
  curve: 'smooth'
},
xaxis: {
  type: 'datetime',
  categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
},
tooltip: {
  x: {
    format: 'dd/MM/yy HH:mm'
  },
},
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

//TABLE
// TABLE: Thay đổi kích thước và kéo thả hàng
const tableBody = document.querySelector('.table tbody');
const tableBodyRows = Array.from(tableBody.children);

// Đồng bộ hóa chiều rộng cột giữa thead và tbody
document.querySelectorAll('.table thead th').forEach(function (headerCell, columnIndex) {
    new ResizeObserver(function () {
        tableBodyRows.forEach(function (row) {
            row.children[columnIndex].style.width = headerCell.offsetWidth + 'px';
        });
    }).observe(headerCell);
});

// Kéo thả hàng trong bảng
tableBodyRows.forEach(function (row) {
    row.addEventListener('dragstart', function () {
        row.classList.add('dragging');
    });

    row.addEventListener('dragend', function () {
        row.classList.remove('dragging');
    });
});

tableBody.addEventListener('dragover', function (e) {
    e.preventDefault();
    const draggingRow = tableBody.querySelector('.dragging');
    const referenceRow = Array.from(tableBody.children).find(function (row) {
        const bound = row.getBoundingClientRect();
        return e.clientY <= bound.y + bound.height / 2;
    });

    if (referenceRow) {
        tableBody.insertBefore(draggingRow, referenceRow);
    } else {
        tableBody.appendChild(draggingRow); // Nếu không tìm thấy vị trí phù hợp, thêm vào cuối
    }
});

// Chỉnh sửa nội dung dữ liệu động trong bảng
document.querySelectorAll('[data-editable]').forEach(function (editableElement) {
    editableElement.addEventListener('click', function () {
        const input = document.createElement('input');
        input.className = editableElement.className;
        input.dataset.editableInput = true;
        input.value = editableElement.dataset.editable || editableElement.textContent;

        input.addEventListener('blur', function () {
            if (input.value.trim()) {
                editableElement.dataset.editable = input.value.trim();
                editableElement.textContent = input.value.trim();
            }
            input.replaceWith(editableElement);
        });

        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                input.blur();
            }
        });

        editableElement.replaceWith(input);
        input.focus();
    });
});
