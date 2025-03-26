# تعریف HTML Element با ویژگی‌های مطلوب

هدف از انجام این تمرین تعریف یک HTML Element دلخواه با نام formula است تا بتواند بر اساس ویژگی evaluator خود به‌طور زنده مقدارش را بر اساس چند تگ input دیگر محاسبه کند و نمایش دهد.

تم این تمرین، هندسه‌ی فضایی است و موضوع فرمول‌های آن، حجم و مساحت چند نمونه از حجم‌های هندسی است.

## ویژگی‌ها

- تگ تعریف‌شده با نام `my-formula` قابل دسترسی است. دلیل انتخاب این نام، لزوم وجود کاراکتر `-`‍ در نام تگ تعریف‌شده است.
- این تگ یک attribute با نام `evaluator` دارد که فرمول موردنظر باید در آن وارد شود.
- فرمول واردشده می‌تواند متشکل از اعداد ثابت و متغیرها باشد، به‌طوری که به‌ازای هر متغیر باید یک تگ input با id متناظر وجود داشته باشد، تا مقدار واردشده در آن در محاسبات استفاده شود.
- - در این برنامه، به‌دلیل استفاده از فرمول‌های ریاضی که عدد $\pi$ در آن‌ها وجود دارد، می‌توان با قرار دادن متغیر `pi` در فرمول از آن بهره برد.
- این برنامه از چهار عملگر اصلی، عملگر توان و پرانتزگذاری در فرمول‌ها پشتیبانی می‌کند.
- امکان انتخاب حجم هندسی موردنظر از طریق select بالای صفحه قابل انجام است. این برنامه شامل فرمول‌های مربوطه برای اشکال زیر است:
  - مکعب
  - کره
  - استوانه
  - مخروط

## اطلاعات فنی

- این پروژه به کمک CSS ،HTML و JavaScript نوشته شده‌است.
- همچنین از فریم‌ورک Bootstrap برای استایل و Responsiveness استفاده شده‌است.
- برای مشاهده‌ی این صفحه کافی است به [این آدرس](https://amir14souri.github.io/WP-HW1) مراجعه کنید.

## گزارش تمرین

### تعریف تگ `my-formula`

ابتدا به کمک JavaScript این تگ را ایجاد می‌کنیم. در ادامه به بررسی قطعه کد مربوطه می‌پردازم:

ابتدا کلاسی می‌سازیم که از کلاس HTMLELement ارث‌بری می‌کند و constructor آن را می‌سازیم:

```js
class FormulaElement extends HTMLElement
```

حالا تابع evaluateFormula را در آن می‌سازیم. در این تابع ابتدا مقدار ویژگی `evaluator` و سپس تمامی تگ‌های input صفحه خوانده می‌شوند. سپس مقدار input ها با کلید id در یک JS Object ذخیره می‌شوند و در صورتی که مقدار حداقل یکی از آن‌ها صفر یا واردنشده باشد، مقدار `my-formula` تغییر نمی‌کند و :) باقی می‌ماند.

در مرحله‌ی بعد تمامی کلیدهایی که در فرمول پیدا شوند، با مقدار عددی‌شان جایگزین می‌شوند. حالا متغیر ‍`pi` با مقدار عدد $\pi$ نیز تعریف می‌شود و پس از آن با استفاده از تابع `eval()` مقدار رابطه‌ی ریاضی محاسبه می‌شود.

اگر محاسبات بدون مشکل انجام شوند، حاصل در تگ `my-formula` قرار می‌گیرد و در غیر این صورت ارور «فرمول نامعتبر» نمایان می‌شود.

```js
evaluateFormaula() {
  let expression = this.getAttribute("evaluator");
  const inputs = document.querySelectorAll("input");
  const values = {};

  inputs.forEach((input) => {
    values[input.id] = parseFloat(input.value) || 0;
  });

  if (Object.values(values).includes(0)) {
    this.innerHTML = ":)";
    return;
  }

  for (const name in values) {
    const value = values[name];
    while (expression.includes(name))
      expression = expression.replace(name, value);
  }

  try {
    const pi = Math.PI;
    const evaluatedValue = eval(expression);
    this.innerText = parseInt(evaluatedValue * 100) / 100;
  } catch (error) {
    this.innerText = "فرمول نامعتبر";
    console.error("Evaluation Error:", error);
  }
}
```

پس از تعریف این تابع، باید به کمک یک EventListener که با عوض شدن مقدار هر یک از تگ‌های input صفحه تریگر می‌شود، مقدار تگ را به‌روز کنیم. این EventListener را در تابع `connectedCallback()` اضافه می‌کنیم تا با هر بار اضافه شدن این تگ به صفحه‌ی HTML فراخونی شود:

```js
connectedCallback() {
  document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", this.evaluateFormaula.bind(this));
  });
}
```

در نهایت نیز این تگ با نام `my-formula` اضافه می‌شود:

```js
customElements.define("my-formula", FormulaElement);
```

### قرار دادن تگ `my-formula` در صفحه

در ادامه نگاهی به شیوه‌ی استفاده از این تگ می‌اندازیم. برای این منظور بخشی از فایل مربوط به حجم هندسی استوانه را بررسی خواهیم کرد.

این حجم هندسی برای محاسبات خود نیاز به دو متغیر شعاع سطح مقطع و ارتفاع دارد، پس به‌ازای هر کدام از آن‌ها باید یک input با id متناسب در صفحه داشته باشیم.

```html
<section class="mt-4">
  <label for="height" class="form-label">ارتفاع (متر)</label>
  <input
    type="number"
    min="0"
    class="form-control form-control-lg"
    id="height"
    placeholder="ex: 27.2" />
</section>
```

به‌عنوان مثال input مربوط به ارتفاع را می‌بینید. نکته‌ی اول این است که برای اعتبارسنجی مقادیر ورودی از `type="number"` و `min=0` استفاده شده‌است. همچنین id این input برابر مقدار `height` است. با علم به وجود تگ input دیگری با id با مقدار `radius` باید تگ `my-formula` را به این‌ صورت تعریف کنیم:

```html
<my-formula evaluator="pi*(radius**2)*height" />
```

همان‌طور که از مقدار `evaluator` مشخص است، این تگ برای محاسبه‌ی زنده‌ی فرمول زیر استفاده می‌شود تا حجم استوانه را به‌دست آورد:

$$V = \pi r^2 h$$

همچنین می‌توان فرمول‌های دیگر را به‌طور مشابه قرار داد:

+ فرمول مساحت جانبی

```html
<my-formula evaluator="2*pi*radius*height" />
```
$$S_L = 2 \pi r h$$

+ فرمول مساحت کل

```html
<my-formula evaluator="2*pi*radius*height + 2*pi*(radius**2)" />
```

$$S_T = S_L + 2 S_C = 2 \pi r h + 2 \pi r^2$$


### امکان انتخاب حجم‌های هندسی

برای پیاده‌سازی این ویژگی برای هر شکل یک فایل HTML در نظر گرفته شده‌است که فقط شامل تگ‌های مربوط به ورودی‌(ها) و خروجی‌های مورنظر است. سپس با کمک اسکریپت زیر و تگ select موجود در index، بخش متناظر با شکل انتخاب‌شده از فایل مربوطه خوانده‌شده و در div با کلاس content قرار می‌گیرد تا نمایش داده شود:

+ تگ select در index.html

```html
<div class="d-flex justify-content-center">
  <select class="form-select text-center">
    <option value="cube" selected>مکعب</option>
    <option value="sphere">کره</option>
    <option value="cylinder">استوانه</option>
    <option value="cone">مخروط</option>
  </select>
</div>
<div class="content"></div>
```
+ اسکریپت

```js
const showContent = (shape) =>
  fetch(`shapes/${shape}.html`)
    .then((response) => response.text())
    .then((data) => (document.querySelector(".content").innerHTML = data))
    .catch((error) => console.error("Error loading content:", error));

shape = document.querySelector("select");
showContent(shape.value);
shape.addEventListener("change", (event) => {
  showContent(event.target.value);
});
```

این قطعه کد با اضافه کردن یک EventListener به تگ select، با هر بار تغییر مقدار آن، فایل مربوط به حجم انتخاب‌شده برا باز می‌کند و محتوایش را به HTML اصلی اضافه می‌کند. البته یک بار نیز در ابتدا و پیش از تریگر شدن select این کار را انجام می‌دهد تا هنگام لود اولیه، محتوای پیش‌فرض مربوط به مکعب نمایش داده شود.