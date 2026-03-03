// school.js – جعل لوحة تحكم المدرسة ديناميكية ومتجاوبة

document.addEventListener('DOMContentLoaded', () => {
    // ============ عناصر رئيسية ============
    const body = document.body;
    const sidebar = document.querySelector('.control-panel');
    const mainContent = document.querySelector('.main-content');
    const headerTitle = document.querySelector('header h1');
    const menuItems = document.querySelectorAll('.menu-item');

    // ============ زر هامبورغر للموبايل ============
    // نضيف زر فقط على الشاشات الصغيرة
    const mobileToggleBtn = document.createElement('button');
    mobileToggleBtn.className =
        'md:hidden fixed top-3 right-3 z-40 bg-indigo-900 text-white p-2 rounded-lg shadow-lg focus:outline-none';
    mobileToggleBtn.innerHTML = '<i class="fas fa-bars text-xl"></i>';
    body.appendChild(mobileToggleBtn);

    // حالة إظهار/إخفاء القائمة في الموبايل
    function openSidebar() {
        sidebar.classList.remove('-translate-x-full');
        sidebar.classList.add('translate-x-0');
        body.classList.add('overflow-hidden');
    }

    function closeSidebar() {
        sidebar.classList.add('-translate-x-full');
        sidebar.classList.remove('translate-x-0');
        body.classList.remove('overflow-hidden');
    }

    function toggleSidebar() {
        if (sidebar.classList.contains('-translate-x-full')) {
            openSidebar();
        } else {
            closeSidebar();
        }
    }

    // إعطاء الكلاس الأساسي للقائمة (للأنيميشن في Tailwind)
    sidebar.classList.add(
        'fixed',
        'md:static',
        'inset-y-0',
        'right-0',
        'md:right-auto',
        'w-64',
        'md:w-64',
        'transform',
        'transition-transform',
        'duration-300',
        '-translate-x-full',
        'md:translate-x-0',
        'z-30'
    );

    mobileToggleBtn.addEventListener('click', toggleSidebar);

    // إغلاق القائمة عند الضغط خارجها في الموبايل
    mainContent.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            closeSidebar();
        }
    });

    // إعادة ضبط القائمة عند تغيير حجم الشاشة
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            sidebar.classList.remove('-translate-x-full');
            sidebar.classList.add('translate-x-0');
            body.classList.remove('overflow-hidden');
        } else {
            sidebar.classList.add('-translate-x-full');
            sidebar.classList.remove('translate-x-0');
        }
    });

    // ============ تفعيل عنصر القائمة النشط ============
    const titlesMap = {
        'لوحة التحكم': 'مرحباً بك في نظام إدارة المدرسة',
        'المعلمين': 'إدارة المعلمين',
        'الطلاب': 'إدارة الطلاب',
        'المطعم': 'إدارة المطعم',
        'المكتبة': 'إدارة المكتبة',
        'الإعدادات': 'الإعدادات العامة للنظام'
    };

    menuItems.forEach(item => {
        item.addEventListener('click', e => {
            e.preventDefault();

            // تمييز العنصر النشط
            menuItems.forEach(i => i.classList.remove('bg-indigo-800'));
            item.classList.add('bg-indigo-800');

            // تحديث العنوان
            const text = item.querySelector('span')?.textContent?.trim();
            if (titlesMap[text]) headerTitle.textContent = titlesMap[text];

            // إغلاق القائمة في الموبايل بعد الاختيار
            if (window.innerWidth < 768) {
                closeSidebar();
            }
        });
    });

    // ============ أزرار CRUD والـ Print ============
    function setupPrintButtons() {
        document.querySelectorAll('.fa-print').forEach(btn => {
            btn.addEventListener('click', e => {
                e.stopPropagation();
                alert('جاري تحضير البيانات للطباعة...');
                window.print();
            });
        });
    }

    function openSimpleModal(titleText) {
        const overlay = document.createElement('div');
        overlay.className =
            'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';

        overlay.innerHTML = `
            <div class="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
                <h2 class="text-lg font-bold mb-4 text-gray-800">${titleText}</h2>
                <div class="space-y-3 mb-4">
                    <input class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="الاسم الكامل">
                    <input class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="البيانات الإضافية">
                </div>
                <div class="flex gap-3 justify-between">
                    <button class="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">حفظ</button>
                    <button class="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300">إلغاء</button>
                </div>
            </div>
        `;

        overlay.addEventListener('click', e => {
            if (e.target === overlay) overlay.remove();
        });

        overlay.querySelectorAll('button')[1].addEventListener('click', () => overlay.remove());
        overlay.querySelectorAll('button')[0].addEventListener('click', () => {
            alert('تم الحفظ (مثال تجريبي)');
            overlay.remove();
        });

        document.body.appendChild(overlay);
    }

    function setupCRUDButtons() {
        document.querySelectorAll('.fa-plus').forEach(btn => {
            btn.addEventListener('click', e => {
                e.stopPropagation();
                openSimpleModal('إضافة عنصر جديد');
            });
        });

        document.querySelectorAll('.fa-edit').forEach(btn => {
            btn.addEventListener('click', e => {
                e.stopPropagation();
                openSimpleModal('تعديل بيانات العنصر');
            });
        });

        document.querySelectorAll('.fa-trash').forEach(btn => {
            btn.addEventListener('click', e => {
                e.stopPropagation();
                if (confirm('هل أنت متأكد من الحذف؟')) {
                    alert('تم حذف العنصر (مثال تجريبي)');
                }
            });
        });
    }

    setupPrintButtons();
    setupCRUDButtons();

    // ============ كروت الأقسام – تأثير ديناميكي بسيط ============
    const departmentCards = document.querySelectorAll('.department-card');
    departmentCards.forEach(card => {
        card.classList.add('cursor-pointer', 'transition', 'duration-300');
        card.addEventListener('click', () => {
            alert('يمكن هنا فتح صفحة تفاصيل القسم (مثال تجريبي)');
        });
    });

    // ============ الإشعارات (الجرس والرسائل) ============
    const bellIcon = document.querySelector('.fa-bell');
    const mailIcon = document.querySelector('.fa-envelope');

    if (bellIcon) {
        bellIcon.addEventListener('click', () => {
            alert('هنا يمكن عرض قائمة الإشعارات بالتفصيل (مثال تجريبي).');
        });
    }

    if (mailIcon) {
        mailIcon.addEventListener('click', () => {
            alert('هنا يمكن عرض الرسائل الواردة (مثال تجريبي).');
        });
    }

    // ============ زر تسجيل الخروج ============
    const logoutBtn = document.querySelector('.fa-sign-out-alt')?.closest('button');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('هل تريد تسجيل الخروج؟')) {
                alert('تم تسجيل الخروج (يمكن تحويل المستخدم لصفحة تسجيل الدخول هنا).');
            }
        });
    }

    // ============ تحسين التجاوب (ارتفاع المحتوى) ============
    function fixMinHeight() {
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 0;
        mainContent.style.minHeight = `calc(100vh - ${headerHeight}px)`;
    }
    fixMinHeight();
    window.addEventListener('resize', fixMinHeight);
});
