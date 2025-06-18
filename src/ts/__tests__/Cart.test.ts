import Movie from "../domain/Movie";
import Cart from "../service/Cart";

describe("Тестируем класс Cart", () => {
  let cart: Cart;
  beforeEach(() => {
    cart = new Cart();
  });

  describe("Функция add()", () => {
    it("добавляет товар в корзину", () => {
      const product = new Movie(
        1,
        100,
        "Матрица",
        1999,
        "США",
        "Мир — иллюзия, созданная машинами.",
        "Фантастический боевик",
        "2 часа 16 минут"
      );
      cart.add(product);
      expect(cart.items.length).toBe(1);
      expect(cart.items[0]).toEqual(product);
    });
  });

  describe("Функция removeById()", () => {
    it("корректно удаляет товар по идентификатору", () => {
      const productA = new Movie(
        1,
        100,
        "Матрица",
        1999,
        "США",
        "Мир — иллюзия, созданная машинами.",
        "Фантастический боевик",
        "2 часа 16 минут"
      );
      const productB = new Movie(
        2,
        100,
        "Интерстеллар",
        2014,
        "США",
        "Путешествие сквозь пространство и время.",
        "Научная фантастика",
        "2 часа 49 минут"
      );

      cart.add(productA);
      cart.add(productB);
      cart.removeById(1);
      expect(cart.items.length).toBe(1);
      expect(cart.items[0].id).not.toBe(1);
    });

    it("игнорирует удаление несуществующих товаров", () => {
      const productA = new Movie(
        1,
        100,
        "Матрица",
        1999,
        "США",
        "Мир — иллюзия, созданная машинами.",
        "Фантастический боевик",
        "2 часа 16 минут"
      );
      cart.add(productA);
      cart.removeById(2);
      expect(cart.items.length).toBe(1);
    });
  });

  describe("Функция calculateTotalCost()", () => {
    it("правильно суммирует общую стоимость товаров", () => {
      const productA = new Movie(
        1,
        100,
        "Матрица",
        1999,
        "США",
        "Мир — иллюзия, созданная машинами.",
        "Фантастический боевик",
        "2 часа 16 минут"
      );
      const productB = new Movie(
        2,
        100,
        "Интерстеллар",
        2014,
        "США",
        "Путешествие сквозь пространство и время.",
        "Научная фантастика",
        "2 часа 49 минут"
      );
      cart.add(productA);
      cart.add(productB);
      expect(cart.calculateTotalCost()).toBe(200);
    });

    it("возвращает ноль, если корзина пуста", () => {
      expect(cart.calculateTotalCost()).toBe(0);
    });
  });

  describe("Функция calculateDiscountedTotal()", () => {
    it("рассчитывает правильную скидку", () => {
      const productA = new Movie(
        1,
        100,
        "Матрица",
        1999,
        "США",
        "Мир — иллюзия, созданная машинами.",
        "Фантастический боевик",
        "2 часа 16 минут"
      );
      const productB = new Movie(
        2,
        100,
        "Интерстеллар",
        2014,
        "США",
        "Путешествие сквозь пространство и время.",
        "Научная фантастика",
        "2 часа 49 минут"
      );
      cart.add(productA);
      cart.add(productB);
      expect(cart.calculateDiscountedTotal(10)).toBeCloseTo(180);
    });

    it("обрабатывает нулевую скидку", () => {
      const productA = new Movie(
        1,
        100,
        "Матрица",
        1999,
        "США",
        "Мир — иллюзия, созданная машинами.",
        "Фантастический боевик",
        "2 часа 16 минут"
      );
      cart.add(productA);
      expect(cart.calculateDiscountedTotal(0)).toBe(100);
    });

    it("бросает ошибку при неправильном значении скидки", () => {
      const productA = new Movie(
        1,
        100,
        "Матрица",
        1999,
        "США",
        "Мир — иллюзия, созданная машинами.",
        "Фантастический боевик",
        "2 часа 16 минут"
      );
      cart.add(productA);
      expect(() => cart.calculateDiscountedTotal(-1)).toThrowError(
        "Скидка должна быть числом от 0 до 100"
      );
      expect(() => cart.calculateDiscountedTotal(101)).toThrowError(
        "Скидка должна быть числом от 0 до 100"
      );
    });
  });
});
